# Stackzip

Stackzip is a small Next.js app for exploring npm dependencies as a visual card grid.

Paste either:

- an npm package spec like `react`, `react@19.2.0`, or `@babel/core`
- a public `package.json` URL

The app resolves the source client-side, fetches package metadata, and renders dependency cards with version and package details.

## Features

- Visual dependency grid for npm packages
- Supports npm package specs and public `package.json` URLs
- Package drill-down with breadcrumb navigation
- Client-side data fetching with React Query
- Built with Next.js 16, React 19, Tailwind v4, and shadcn/ui

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev        # start the dev server
pnpm build      # build for production
pnpm start      # start the production server
pnpm lint       # run Biome lint
pnpm typecheck  # run TypeScript checks
pnpm check      # format, lint, and typecheck
```

## How It Works

- Bare package names are resolved from the npm registry
- Versioned package specs are fetched from `unpkg`
- Public `package.json` URLs are fetched through `corsmirror.com`
- GitHub blob URLs are converted to raw file URLs automatically

All fetching happens in the browser. There are no API routes or server-side proxy handlers in this project.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui with Base UI primitives
- TanStack Query
- nuqs
- Biome
