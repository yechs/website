import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import remarkMath from 'remark-math';

import {
  remarkAdmonitions,
  remarkExplicitHeadingIds,
} from './src/plugins/remark-admonitions.mjs';

export default defineConfig({
  site: 'https://shuye.dev',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMath,
        remarkDirective,
        remarkAdmonitions,
        remarkExplicitHeadingIds,
      ],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: 'github-light',
      langAlias: {
        gdb: 'text',
        'shell-session': 'shellscript',
      },
      wrap: true,
    },
  },
  redirects: {
    '/blog': '/writing/',
    '/blog/archive': '/writing/',
    '/blog/authors': '/writing/',
    '/blog/tags': '/writing/',
    '/blog/tags/c': '/writing/malloc_chunk/',
    '/blog/tags/pwn': '/writing/malloc_chunk/',
    '/blog/tags/essays': '/writing/welcome/',
    '/blog/tags/events': '/writing/welcome/',
    '/blog/welcome': '/writing/welcome/',
    '/blog/malloc_chunk': '/writing/malloc_chunk/',
  },
});
