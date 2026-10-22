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

The production build is generated in `dist/` and deployed to Cloudflare Workers
Static Assets as `shuye-website`. No Astro adapter or Worker script is required.

```console
npx wrangler login         # Authenticate for local deployments
npm run build
npx wrangler dev           # Preview assets and Cloudflare redirects locally
npm run deploy             # Build and deploy
```

The GitHub Actions deployment workflow runs after quality checks on pushes to
`main`. Configure repository secrets `CLOUDFLARE_API_TOKEN` (with Workers Scripts
Edit permission for the target account) and `CLOUDFLARE_ACCOUNT_ID` before using
it. Do not also enable Workers Builds for the same branch unless you disable
the GitHub deployment workflow.

Pull requests from this repository also deploy a Cloudflare Preview named
`pr-<number>` after quality checks. The workflow updates one PR comment with the
preview URL and deletes the Preview when the PR closes. Fork PRs run quality
checks without deploying previews. Dependabot PRs also deploy previews; add
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as Dependabot secrets with the
same names as the Actions secrets. Cloudflare Workers Builds is not required.

After verifying the initial deployment at its `workers.dev` URL, attach
`shuye.dev` as a Custom Domain in the Worker's Cloudflare settings to switch
production traffic.

HTTP redirects live in `public/_redirects`, which Astro copies into `dist/`.
They include the legacy blog URLs and a 301 redirect stripping `/zh-CN` from
any path. Use `wrangler dev` to check these; Astro's dev and preview servers do
not interpret Cloudflare's redirect file.

Keep `compatibility_date` in `wrangler.jsonc` pinned. Update it deliberately
after reviewing Cloudflare's compatibility flags and checking the site with
Wrangler; do not replace it with the current date automatically on each build.
