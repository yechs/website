import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import { themes as prismThemes } from 'prism-react-renderer';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'Ye Shu',
  tagline: undefined,
  favicon: 'favicon.ico',

  url: 'https://shuye.dev',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // cross-repo deployment
  organizationName: 'yechs',
  projectName: 'yechs.github.io',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },

  themeConfig: {
    // for social card
    // image: 'img/yechs-todo-social-card.jpeg',
    colorMode: {
      defaultMode: 'light',
      // respectPrefersColorScheme: true,
    },
    navbar: {
      title: '@yechs',
      logo: {
        alt: 'Ye Shu',
        src: 'img/yechs.jpeg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Knowledge Base',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          to: '/gallery',
          label: 'Gallery',
          position: 'left',
        },
        {
          href: 'https://github.com/yechs',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/yechs/',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
      // hideOnScroll: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'This Site',
          items: [
            {
              label: 'Knowledge Base',
              to: '/kb/intro',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Connect with Me',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/yechs',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/yechs/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Williams Students Online',
              href: 'https://wso.williams.edu/',
            },
            {
              label: 'Computerization',
              href: 'https://computerization.io/',
            },
            {
              label: 'Team 0x194',
              href: 'https://0x194.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ye Shu. Some Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'kb',
          editUrl: 'https://github.com/yechs/website/edit/main/',
          editLocalizedFiles: false,
          routeBasePath: 'kb',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          path: 'blog',
          editUrl: 'https://github.com/yechs/website/edit/main/blog/',
          blogTitle: 'Blog',
          blogDescription: 'Some thoughts from Ye Shu',
          blogSidebarCount: 5,
          blogSidebarTitle: 'Recent Posts',
          routeBasePath: 'blog',
          showReadingTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-M3X8PGC98D',
        },
      } satisfies Preset.Options,
    ],
  ],
};

export default config;
