import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
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
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Source Serif 4',
      cssVariable: '--font-source-serif',
      weights: [600],
      styles: ['normal'],
      options: {
        variants: [
          {
            src: [
              '@fontsource/source-serif-4/files/source-serif-4-latin-600-normal.woff2',
            ],
            weight: 600,
            style: 'normal',
          },
        ],
      },
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      provider: fontProviders.local(),
      name: 'Source Sans 3 Variable',
      cssVariable: '--font-source-sans',
      weights: ['200 900'],
      styles: ['normal'],
      options: {
        variants: [
          {
            src: [
              '@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2',
            ],
            weight: '200 900',
            style: 'normal',
          },
        ],
      },
      fallbacks: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'sans-serif',
      ],
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans Variable',
      cssVariable: '--font-plex-sans',
      weights: ['100 700'],
      styles: ['normal'],
      options: {
        variants: [
          {
            src: [
              '@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2',
            ],
            weight: '100 700',
            style: 'normal',
          },
        ],
      },
      fallbacks: [
        'Source Sans 3 Variable',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'sans-serif',
      ],
    },
  ],
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
      theme: 'github-light-high-contrast',
      langAlias: {
        gdb: 'text',
        'shell-session': 'shellscript',
      },
      // Code wraps by default except for code blocks marked `nowrap`
      wrap: false,
      transformers: [
        {
          name: 'nowrap-meta',
          pre(node) {
            if (/\bnowrap\b/.test(this.options.meta?.__raw ?? '')) {
              this.addClassToHast(node, 'code-nowrap');
            }
          },
        },
      ],
    },
  },
});
