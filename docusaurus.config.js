// @ts-check
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Ye Shu',
  tagline: undefined,
  url: 'https://shuye.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',
  organizationName: 'yechs', // Usually your GitHub org/user name.
  projectName: 'yechs.github.io', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
    }),
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          path: 'kb',
          editUrl: 'https://github.com/yechs/website/edit/master/',
          editLocalizedFiles: false,
          routeBasePath: 'kb',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          path: 'blog',
          editUrl: 'https://github.com/yechs/website/edit/master/blog/',
          blogTitle: 'Blog',
          blogDescription: 'Some thoughts from Ye Shu',
          blogSidebarCount: 5,
          blogSidebarTitle: 'Recent Posts',
          routeBasePath: 'blog',
          showReadingTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-M3X8PGC98D',
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
      integrity:
        'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
      crossorigin: 'anonymous',
    },
  ],
};
