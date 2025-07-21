# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm dev             # Start development server with Turbopack
pnpm build           # Build production bundle
pnpm start           # Start production server
pnpm lint            # Run ESLint
```

## Project Architecture

**Stackzip** is a Next.js application that analyzes package.json files from GitHub URLs and provides rich dependency insights with GitHub integration.

### Core Architecture

**Data Flow:**

1. **Input Processing** (`src/app/zip/page.tsx`): User submits GitHub package.json URL
2. **Package Parsing** (`src/lib/packages.ts`): Fetches and parses package.json from raw GitHub URL
3. **Data Enrichment** (`src/app/zip/actions.ts`): Server actions orchestrate npm registry and GitHub API calls
4. **Visualization** (`src/components/package-card.tsx`): Displays enriched package data with filtering/sorting

### External API Integration

**GitHub GraphQL API:**

- Requires `GITHUB_TOKEN` environment variable
- Batches multiple repository queries in single GraphQL request using dynamic aliases

**NPM Registry:**

- Fetches package metadata from `https://registry.npmjs.org/{packageName}`
- Handles missing packages gracefully (returns null)

### Component Architecture

**Main Page** (`src/app/zip/page.tsx`):

- Manages loading states with progressive messages (package.json → npm data → GitHub data)
- Uses `nuqs` for URL state management with query parameter
- Implements filtering by dependency groups with toggle buttons
- Sort controls with asc/desc button and dropdown selector

### Styling

- **Tailwind CSS v4** with custom animations via `tw-animate-css`
- **Design System**: Uses shadcn/ui component library with Radix UI primitives
- **Font**: Monospace font throughout (`font-mono` class)

## Development Workflow

- Run `pnpm run test:run` and `pnpm build` to confirm there's no errors after making changes
