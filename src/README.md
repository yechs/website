# Source Organization

## Components and ownership

- `components/site/`: shared site header and footer, composed by BaseLayout.
- `components/home/`: the six homepage regions, section navigation,
  PublicationLedgerEntry, and homepage-only PersonSchema. `pages/index.astro`
  sets metadata and section order; each region owns its queries and data imports.
- `components/PublicationEntry.astro`: annotated bibliography entries for the
  dedicated publications route, distinct from the homepage publication ledger.
- `components/WritingList.astro`: the browsable writing archive list.
- `components/ResourceLinks.astro`: genuinely repeated resource-link presentation.
  It accepts link records and an optional accessible label; callers decide
  whether empty lists should render.

Keep focused standalone components at the root. Add a subdirectory when it
groups several components with clear ownership, not merely for one filename.

Dependencies flow from pages/layouts to owned components, then to shared
components, data, or `lib/` helpers. Shared components do not import factual
datasets or page-owned components; data modules do not import UI.
Avoid generic section/heading/record abstractions without demonstrated reuse.

## Where to edit content

Data stays flat and domain-oriented:

- `data/profile.ts`: contact and scholarly profile destinations.
- `data/research.ts`: the displayed research threads.
- `data/publications.ts`: canonical publication metadata, explanations, resources,
  and representative selection used by both homepage and publications route.
- `data/teaching.ts`: co-instruction and teaching-assistant course records.
- `data/service.ts`: academic and community service.
- `data/awards.ts`: curated recognition records.
- `data/experience.ts`: the displayed technical experience, in homepage order.
- `data/gallery.ts`: photography metadata.

Keep record types alongside their domain data. Export a type only when another
module consumes it, as with Publication. Do not maintain unused datasets or a
central type collection; introduce a shared type only for a genuinely shared
domain model, not merely records that happen to have similar fields.

Writing and technical notes live in `content/` as Astro content collections.
Rich linked homepage prose belongs in its section component, not serialized HTML
in data files. Keep claims and dates grounded in existing factual sources.

## Styles and rendering

`global.css` provides common foundations through BaseLayout. The homepage imports
`home.css`; deeper pages use `content.css` through PageLayout. Math CSS remains
conditional on article content requiring it. Components render statically unless
they explicitly own an interaction, such as the small homepage navigation script.
Do not add client hydration or move deeper-page resources into the homepage.

Outer page shells, headers, and footers share `--site-gutter` from `global.css`
at every viewport width. Keep prose reading measures separate from that shared
outer frame; do not introduce route-specific gutter values.
