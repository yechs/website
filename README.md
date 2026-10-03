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

Homepage data is in `src/data/`, writing in `blog/`, archived technical notes
in `kb/`, and public images and PDFs in `static/`. Astro reads the writing and
notes directly through content collections, so those Markdown files remain the
single source of truth.

The production workflow builds `dist/` and publishes it to the `master` branch
of `yechs/yechs.github.io`.
