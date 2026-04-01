# Stackzip

- Visualizes npm dependencies from any npm package name or `package.json` URL as a card grid with metadata.
- Next.js 16 App Router, React 19, Tailwind v4, shadcn/ui (base-nova style), Biome, TypeScript strict.
- All data fetching is client-side — no API routes or server proxy (CORS proxy via corsmirror.com).

## Repo Map

- `app/` — Next.js routes. Page-specific components go in `_components/` within each route folder.
- `app/_components/` — Landing page components (hero, features, FAQ).
- `app/package/_components/` — `/package` page components (dep grid, sidebar, error/empty states).
- `features/npm/` — npm domain: types, registry/downloads fetch helpers, semver logic, `useNpmPackage` hook, `PackageCard` compound component.
- `features/package-json/` — package.json domain: types, fetch helper (with GitHub URL conversion + CORS proxy), `usePackageJson` hook.
- `components/` — Shared across routes: header, URL input, providers (QueryClient + nuqs).
- `components/ui/` — shadcn/ui primitives (Base UI backed).
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).

## Commands

```bash
pnpm install              # install deps
pnpm dev                  # dev server
pnpm typecheck            # tsc --noEmit
pnpm lint                 # biome lint
pnpm check                # biome check --write --unsafe + typecheck
pnpm build                # production build
```

After any code change, run `pnpm check` to format, lint, and typecheck in one pass.

## Codebase Rules

### Component patterns (React 19)
- Use `use(Context)` — never `useContext`.
- `ref` is a regular prop — never use `forwardRef`.
- Compound components share state via context providers (see `PackageCard` for the pattern).
- Leaf/presentational components accept `React.ComponentProps<"element">`, merge `className` via `cn()`, and spread remaining props.
- Always keep `AGENTS.md` (this content) up to date as codebase evolves.

### File organization
- Page-specific components: `app/<route>/_components/`.
- Only promote to `components/` when shared across multiple routes.
- Feature domains: `features/<domain>/` with `types.ts`, `lib/`, `hooks/`, `components/`.

### Data fetching
- All fetching happens client-side via `@tanstack/react-query`.
- The `src` query param accepts either a public `package.json` URL or an npm package spec like `react`, `react@19.2.0`, or `@babel/core@7.29.0`.
- package.json URLs are proxied through `https://corsmirror.com/v1?url=<url>`.
- GitHub blob URLs are auto-converted to `raw.githubusercontent.com` before fetching.
- npm package specs with explicit versions are converted to `https://unpkg.com/<package-spec>/package.json` before fetching.
- Bare npm package names are resolved against the npm registry `latest` version first, then converted to the matching unpkg `package.json` URL.
- npm registry (`registry.npmjs.org`) and downloads API (`api.npmjs.org`) are called directly (CORS-enabled).

### URL state
- Managed via `nuqs`. Query params: `src` (package.json URL or npm package spec) and `breadcrumbs` (compact ancestor trail string for package drill-down navigation; package-name crumbs store only `src`, URL-derived crumbs store `label>src`, and crumbs are joined with `|`).

### Styling
- Tailwind v4 with shadcn CSS variables (oklch color space, dark mode via `.dark` class).
- Always use `cn("base-classes", className)` — never raw string concatenation for class merging.
- Lucide imports should use local `*Icon` names, either by importing the `...Icon` export or aliasing bare Lucide exports to an `...Icon` suffix.

## Safety / Gotchas

- Do not add API routes or server-side fetching — the app is fully client-side by design.
- Do not use `useContext` or `forwardRef` — these are legacy React patterns in this codebase.
- The `semver` package is used for version comparison — do not hand-roll semver logic.
- shadcn components use `@base-ui/react` primitives, not Radix — check `components.json` for the `base-nova` style.
