# Ye Shu's Website

Personal academic website for research, publications, writing, service,
photography, and technical notes. Built with [Astro](https://astro.build/).

## Development

Requires Node.js 24+ and npm 11+.

```console
npm ci
npm run dev
```

Useful commands:

```console
npm run typecheck  # Check Astro and TypeScript
npm run lint       # Check JavaScript and TypeScript
npm run format     # Check formatting
npm run build      # Build the static site into dist/
npm run preview    # Preview the production build
```

## Content

- Homepage data: `src/data/`
- Writing and knowledge base: `src/content/`
- Components, layouts, pages, and styles: `src/`
- Images, papers, and site metadata: `public/`

## Site Assets

The default social image is `public/og-image.jpg`. Regenerate it with:

```console
npm run generate:og
```

The favicon is at `public/favicon.ico` and `public/favicon.svg`. Regenerate them with:

```console
npm run generate:favicon
```

For the gallery, generate the different image sizes and srcsets (used in `src/data/gallery.ts`) with:

```console
uv run scripts/generate-gallery-srcset.py public/img/gallery
```

Python tooling is only needed for these asset-generation commands. The regular
development and build workflows use Node.js and npm.

## Deployment

The production build is generated in `dist/` and published to the `master`
branch of `yechs/yechs.github.io`.
