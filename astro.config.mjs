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
  publicDir: './static',
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
    '/zh-Hans': '/',
    '/zh-Hans/blog': '/zh-Hans/writing/',
    '/zh-Hans/blog/archive': '/zh-Hans/writing/',
    '/zh-Hans/blog/authors': '/zh-Hans/writing/',
    '/zh-Hans/blog/tags': '/zh-Hans/writing/',
    '/zh-Hans/blog/tags/c': '/zh-Hans/writing/malloc_chunk/',
    '/zh-Hans/blog/tags/pwn': '/zh-Hans/writing/malloc_chunk/',
    '/zh-Hans/blog/tags/essays': '/writing/welcome/',
    '/zh-Hans/blog/tags/events': '/writing/welcome/',
    '/zh-Hans/blog/welcome': '/writing/welcome/',
    '/zh-Hans/blog/malloc_chunk': '/zh-Hans/writing/malloc_chunk/',
    '/zh-Hans/gallery': '/gallery/',
    '/zh-Hans/kb/AI-engineering/Model-export':
      '/kb/AI-engineering/Model-export/',
    '/zh-Hans/kb/crypto/PGP': '/kb/crypto/PGP/',
    '/zh-Hans/kb/crypto/RSA': '/kb/crypto/RSA/',
    '/zh-Hans/kb/network/c-socket': '/kb/network/c-socket/',
    '/zh-Hans/kb/network/unix-socket': '/kb/network/unix-socket/',
    '/zh-Hans/kb/radio/ham': '/kb/radio/ham/',
    '/zh-Hans/kb/software/c-macros': '/kb/software/c-macros/',
    '/zh-Hans/kb/software/cross-compile-c': '/kb/software/cross-compile-c/',
    '/zh-Hans/kb/sysadmin/Windows_Thin_PC': '/kb/sysadmin/Windows_Thin_PC/',
    '/zh-Hans/kb/sysadmin/basic-auth': '/kb/sysadmin/basic-auth/',
    '/zh-Hans/kb/sysadmin/ipykernel_venv': '/kb/sysadmin/ipykernel_venv/',
    '/zh-Hans/kb/sysadmin/jenkins': '/kb/sysadmin/jenkins/',
    '/zh-Hans/kb/sysadmin/setup': '/kb/sysadmin/setup/',
    '/zh-Hans/kb/webdev/pictures': '/kb/webdev/pictures/',
    '/zh-Hans/kb/webdev/yarn': '/kb/webdev/yarn/',
  },
});
