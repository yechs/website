import type { CollectionEntry } from 'astro:content';

type WritingEntry = CollectionEntry<'writing'>;
type KnowledgeBaseEntry = CollectionEntry<'knowledgeBase'>;

export function writingDate(entry: WritingEntry): Date {
  if (entry.data.date) return entry.data.date;

  const match = entry.id.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return new Date('1970-01-01T00:00:00Z');

  return new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00Z`);
}

export function writingSlug(entry: WritingEntry): string {
  if (entry.data.slug) return entry.data.slug;
  return entry.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function formatDate(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function kbSlug(entry: KnowledgeBaseEntry): string {
  if (entry.data.slug) return entry.data.slug.replace(/^\//, '');

  const path = entry.filePath?.replaceAll('\\', '/');
  if (path) {
    const base = '/content/knowledge-base/';
    const baseIndex = path.lastIndexOf(base);
    if (baseIndex >= 0) {
      return path.slice(baseIndex + base.length).replace(/\.(md|mdx)$/, '');
    }
  }

  return entry.id;
}

export function kbTitle(entry: KnowledgeBaseEntry): string {
  if (entry.data.title) return entry.data.title;
  if (entry.data.sidebar_label) return entry.data.sidebar_label;

  const firstHeading = entry.body?.match(/^#\s+(.+)$/m)?.[1];
  if (firstHeading) return firstHeading.replace(/\s+\{#[^}]+\}$/, '');

  const filename = kbSlug(entry).split('/').at(-1) || entry.id;
  return filename
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function kbCategory(entry: KnowledgeBaseEntry): string {
  const slug = kbSlug(entry);
  const [category] = slug.split('/');
  if (!slug.includes('/')) return 'General';

  const labels: Record<string, string> = {
    'AI-engineering': 'AI Engineering',
    crypto: 'Cryptography',
    network: 'Networking',
    radio: 'Radio',
    software: 'Software Programming',
    sysadmin: 'SysAdmin / DevOps',
    webdev: 'Web Development',
  };

  return labels[category] || category.replace(/[-_]/g, ' ');
}
