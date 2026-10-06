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

## Default social image

`scripts/generate_og.py` renders `public/img/og-default.jpg`: a 1200×630 RGB
JPEG with the approved homepage portrait, Source Serif 4, and Inter. It uses
Pillow with inline uv dependencies and reads the site's existing WOFF fonts
from `node_modules`, so run `npm ci` first. No extra npm dependencies, font
copies, network font fetching, or AI image generation are involved.

```console
uv run scripts/generate_og.py
uv run scripts/generate_og.py --check
# Optional comparison without replacing the default:
uv run scripts/generate_og.py --output /tmp/og-preview.jpg
```

`npm run generate:og` is an equivalent shortcut. Edit the identity copy and
layout constants in the generator when those details change on the homepage;
colors follow `src/styles/global.css`. Regenerate after changes to the portrait,
font packages, or composition, then inspect both full-size and small previews.
The script checks text bounds and JPEG dimensions; `--check` also compares bytes.
Pinned Pillow and locked site fonts aid repeatability, but exact bytes can still
vary with the platform's font-rendering libraries.

BaseLayout defaults to this shared image for Open Graph and large-image Twitter
cards. Pages may supply `image` and `imageAlt`; writing supports the same optional
front-matter fields. Existing posts omit them and inherit the default. Provide
descriptive alt text for custom images; otherwise it falls back to the page
title. The 1200×630 dimensions and JPEG type apply only to the default asset.
The asset is committed, not generated during development or the site build,
and is not displayed or fetched by the homepage itself.

Homepage-only Person JSON-LD lives in `components/home/PersonSchema.astro`,
included by `pages/index.astro` through BaseLayout's head slot. It reuses profile
links and the actual portrait, independently of the default social graphic.

## Favicon

The favicon is an outlined Inter Bold `Ye` in scholarly blue on white.
`public/favicon.svg` is the editable source of its outlined letterforms,
balanced spacing, and color. The Python generator uses CairoSVG for rasterization
and Pillow (also used by the gallery script) for ICO packaging. No AI image
generation or browser font download is involved.

```console
npm run generate:favicon            # Generate public/favicon.ico from the SVG
npm run generate:favicon -- --check  # Verify the ICO without changing it
```

Install [uv](https://docs.astral.sh/uv/) to run this optional maintenance command.
Each Python image script declares its dependencies inline; `uv run` creates a
cached, isolated environment automatically, without a root Python project or
extra npm dependencies. You can also run
`uv run scripts/generate-favicon.py` directly. The committed SVG is
resolution-independent; the ICO contains
16, 32, and 48px fallbacks, each rendered directly from the vector source.
Regeneration is not part of the site build. After editing the source SVG,
regenerate the ICO and inspect all three sizes before committing both files.

The gallery utility follows the same convention:

```console
uv run scripts/generate-gallery-srcset.py public/img/gallery
```

Use the actual gallery directory under `public/`. Direct dependency versions are
pinned in each script; transitive dependencies are not locked. Python tooling is
optional and is not required to develop or build the website.

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
