# Ye Shu's Website

This repository contains Ye Shu's personal academic website: research,
publications, occasional writing, service, photography, and an archived
collection of technical notes. It is a statically generated
[Astro](https://astro.build/) site.

## Prerequisites

- Node.js 24 or newer
- npm 11 or newer

## Development

```console
npm ci
npm start
```

The primary commands are:

```console
npm run typecheck  # Validate Astro and TypeScript
npm run lint       # Check JavaScript and TypeScript
npm run format     # Check formatting
npm run build      # Build the static site into dist/
npm run serve      # Preview an existing production build
```

Homepage data is in `src/data/`. Writing and archived technical notes are in
`src/content/`, and static images and PDFs are in `public/`. Astro reads the
Markdown directly through content collections, so those files remain the
single source of truth.

```text
src/
├── components/        Reusable Astro components
├── content/           Writing and knowledge-base Markdown
├── data/              Research, publication, service, and gallery data
├── layouts/           Shared page layouts
├── pages/             File-based routes
└── styles/            Global design system
public/                 Static images, papers, and site metadata
```

The production workflow builds `dist/` and publishes it to the `master` branch
of `yechs/yechs.github.io`.
