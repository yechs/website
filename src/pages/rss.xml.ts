import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import { writingDate, writingSlug } from '../lib/content';

export async function GET(context: { site: URL }) {
  const entries = (
    await getCollection('writing', ({ data }) => !data.draft)
  ).sort((a, b) => writingDate(b).valueOf() - writingDate(a).valueOf());

  return rss({
    title: 'Ye Shu — Writing',
    description:
      'Occasional notes on security, systems, measurement, and software.',
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: writingDate(entry),
      link: `/writing/${writingSlug(entry)}/`,
    })),
  });
}
