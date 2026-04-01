# Stackzip — Implementation Plan

## Overview

Stackzip is a web app that visualizes npm dependencies from any `package.json` URL. Users paste a URL, and the app fetches the file, looks up each package on the npm registry (client-side, in parallel), and displays the results as a visual card grid with metadata.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind v4 |
| Components | shadcn/ui |
| URL state | nuqs |
| Data fetching | @tanstack/react-query |
| Linting/formatting | Biome |

---

## Architecture Principles

### Co-location
Page-specific components live in a `_components/` directory inside the route folder. Only components shared across multiple routes are promoted to `components/`.

### Feature directories
Domain logic (types, helpers, hooks, components) is grouped under `features/<domain>/`. Each feature owns everything needed to function:
- `types.ts` — TypeScript interfaces
- `lib/` — pure helpers (fetch, transform, format)
- `hooks/` — tanstack query hooks
- `components/` — domain components used across pages

### Composition (vercel-composition-patterns skill)
All non-trivial components follow compound component + provider patterns:
- No boolean prop proliferation — use explicit variant components instead
- Compound components share state via context (`use(Context)` — React 19, no `useContext`)
- State is decoupled from UI via provider components with generic `{ state, actions, meta }` interfaces
- `children` for composition; render props only when data must flow back up
- No `forwardRef` — `ref` is a regular prop in React 19

### Composable component shape
Every leaf/presentational component is authored as a composable wrapper — it accepts all native props of the underlying element, merges `className` via `cn()`, and forwards everything else via spread:

```tsx
export const ComponentName = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("", className)} {...props} />;
};
```

Rules:
- Always use `cn("base-classes", className)` so callers can override styles
you can add unique props type using `& { ... }` syntax.
- Always spread `...props` so all native attributes (event handlers, aria, data-*) pass through without being manually listed
- The underlying element (`"div"`, `"button"`, etc.) is the source of truth for allowed props

---

## Routes

### `/` — Landing Page

#### Layout
- Shared `<Header>` with logo ("Stackzip") and nav links
- Hero section
- Features section
- FAQ section
- Footer

#### Hero
- Headline + sub-headline copy
- `<UrlInput>` (shared component) with a submit button → navigates to `/package?src=<url>`
- Quick-start example buttons: pre-filled `src` URLs (e.g. Next.js, Vite, shadcn/ui)

#### Features
3–4 feature cards: "Instant visualization", "Direct npm links", "Outdated detection", "Zero server — runs in your browser"

#### FAQ
1. What is Stackzip?
2. How do I get my `package.json` URL?
3. Does this work with private packages?
4. Is my data sent to a server?
5. What npm registries are supported?
6. Why is a package missing from the list?

---

### `/package?src=<url>&sort=<key>` — Dependency Viewer

#### URL State (via `nuqs`)
- `src` — raw URL of the remote `package.json`. Changing it pushes a new history entry.
- `sort` — active sort key. Persisted in URL. Default: `name`.

#### Layout
- Shared `<Header>`
- Full-width top bar with `<UrlInput>` (pre-filled with current `src`). On submit → push new `src` to URL
- Two-column layout:
  - **Main area**: sort controls + dependency sections + card grid
  - **Right sidebar**: source metadata panel

#### Right Sidebar — Source Metadata
Derived from the fetched `package.json` (not npm registry):
- `name`, `version`, `description`, `license`, `homepage` / `repository`
- Total dep counts per type

#### Dependency Sections
Rendered in order, each only shown if non-empty:
1. `dependencies`
2. `devDependencies`
3. `peerDependencies`
4. `optionalDependencies`

Each section: heading + count badge (e.g. "dependencies · 12") + responsive card grid.

#### Sort Controls
Dropdown above the grid, applies to all sections. Sourced from npm registry data:

| Key | Label | Source field |
|---|---|---|
| `name` | Name (A → Z) | `name` |
| `downloads` | Weekly Downloads | npm downloads API |
| `published` | Last Published | `time.modified` |
| `latest` | Latest Version | `dist-tags.latest` |

---

## Package Card

Compound component: `PackageCard.Root`, `PackageCard.Name`, `PackageCard.Description`, `PackageCard.VersionRow`, `PackageCard.Links`, `PackageCard.Meta`.

### Content
- **Name** → `https://npmx.dev/package/<name>` (new tab)
- **Description** — from npm registry, `line-clamp-4`
- **Version row**:
  - Range from `package.json` (e.g. `^1.2.3`) — muted
  - Latest version from npm (e.g. `1.5.0`) — colored by outdated status:
    - Green — range satisfies latest
    - Amber — minor/patch behind
    - Red — major behind
- **Icon links** (hidden when data unavailable):
  - npm icon → `https://npmjs.com/package/<name>` (new tab)
  - GitHub icon → repo URL from npm metadata (new tab)
  - Globe icon → homepage if different from GitHub (new tab)
- **License badge** (e.g. `MIT`)
- **Weekly downloads** — human-formatted (e.g. `1.2M`)

### States
- **Loading**: generic skeleton (gray animated blocks matching card dimensions)
- **Error**: card silently skipped (not rendered)

---

## Data Fetching

All requests are made **client-side from the browser** — no server proxy.

### Step 1 — Fetch `package.json`
```
GET <src url>
```
`useQuery` keyed on `src`. On error: full-page error state.

### Step 2 — Fetch npm data per package (parallel)
Two independent `useQuery` entries per package, all firing in parallel. Tanstack Query deduplicates if a package appears in multiple dep sections.

**Registry metadata:**
```
GET https://registry.npmjs.org/<package>
```
Fields used: `description`, `license`, `homepage`, `repository.url`, `dist-tags.latest`, `time.modified`

**Download count:**
```
GET https://api.npmjs.org/downloads/point/last-week/<package>
```
Field used: `downloads`

### Step 3 — Outdated status
`semver.satisfies(latest, range)`:
- satisfied → green
- not satisfied, same major → amber
- not satisfied, different major → red

Uses the `semver` package.

---

## Empty & Error States

| Scenario | UI |
|---|---|
| `src` URL unreachable or invalid JSON | Full-page error + retry/clear button |
| `package.json` has zero deps | Empty state with message |
| Individual package fetch fails | Card silently skipped |

---

## Color Palette

Vercel-inspired monotone:
- Background: `zinc-950` / `white`
- Surface/card: `zinc-900` / `zinc-50`
- Border: `zinc-800` / `zinc-200`
- Primary text: `zinc-50` / `zinc-950`
- Muted text: `zinc-400` / `zinc-500`
- Accent: inverted (`zinc-100` / `zinc-900`)
- Status: `green-400`, `amber-400`, `red-400` (both modes)

Dark mode via `dark:` classes, system preference default.

---

## File Structure

```
app/
  layout.tsx                        # root layout + QueryClient provider
  page.tsx                          # LP (server component)
  _components/                      # LP-only components
    hero.tsx
    quick-start-buttons.tsx
    features-section.tsx
    faq-section.tsx
  package/
    page.tsx                        # /package server shell
    _components/                    # package page-only components
      package-page-client.tsx       # "use client" — nuqs + query wiring
      dep-section.tsx               # compound: DepSection.Root, .Header, .Grid
      source-sidebar.tsx
      sort-select.tsx
      empty-state.tsx
      error-state.tsx

features/
  npm/
    types.ts                        # NpmPackage, NpmDownloads, OutdatedStatus
    lib/
      registry.ts                   # fetch helpers for registry.npmjs.org
      downloads.ts                  # fetch helpers for api.npmjs.org/downloads
      semver.ts                     # outdated status derivation
      format.ts                     # formatDownloads, formatDate
    hooks/
      use-npm-package.ts            # useQuery for registry + downloads, merged
    components/
      package-card/
        index.tsx                   # compound export: PackageCard.Root, .Name, etc.
        package-card-context.tsx    # PackageCardContext + provider
        package-card-name.tsx
        package-card-description.tsx
        package-card-version-row.tsx
        package-card-links.tsx
        package-card-meta.tsx
        package-card-skeleton.tsx

  package-json/
    types.ts                        # PackageJson, DepEntry, DepType
    lib/
      fetch.ts                      # fetch + parse + validate package.json URL
    hooks/
      use-package-json.ts           # useQuery for the source package.json

components/
  header.tsx                        # shared across routes
  url-input.tsx                     # shared: used on LP hero + package page top bar
```

---

## Implementation Order

1. Install deps: `nuqs`, `@tanstack/react-query`, `semver` + `@types/semver`
2. Root layout: `QueryClientProvider` + `<Header>`
3. `features/package-json/` — types, fetch helper, `usePackageJson` hook
4. `features/npm/lib/` — registry + downloads helpers, semver, format
5. `features/npm/hooks/use-npm-package.ts`
6. `features/npm/components/package-card/` — compound component + skeleton
7. `/package` page: `_components/dep-section`, `sort-select`, `source-sidebar`, `empty-state`, `error-state`, `package-page-client`
8. Landing page: `_components/hero`, `quick-start-buttons`, `features-section`, `faq-section`
9. `components/url-input.tsx` — shared input (used in hero + package page top bar)
10. Dark mode + color palette polish
