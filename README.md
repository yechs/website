# Ye Shu's Website

This repository contains Ye Shu's personal academic and technical website: a
profile of his work as a computer science PhD student at UC San Diego,
publications and news, a blog, a knowledge base, and a photo gallery. The site
is built with [Docusaurus](https://docusaurus.io/).

## Prerequisites

- Node.js 24 LTS or newer
- npm 11 or newer (included with Node.js 24)

## Install

```console
npm ci
```

## Develop and validate

```console
npm start          # Run the local development server
npm run build      # Create the production site in build/
npm run serve      # Serve an existing production build
npm run typecheck  # Check TypeScript
npm run lint       # Check JavaScript and TypeScript
npm run format     # Check Prettier formatting
```

Use `npm run format:fix` to apply Prettier formatting. Profile and publication
content lives in `src/`, blog posts in `blog/`, the knowledge base in `kb/`,
translated content in `i18n/`, and static assets in `static/`.
