/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Ye Shu',
  tagline: undefined,
  url: 'https://shuye.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'yechs', // Usually your GitHub org/user name.
  projectName: 'yechs.github.io', // Usually your repo name.
  themeConfig: {
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
          label: 'Tutorial',
        },
        {
          to: '/thoughts',
          label: 'Thoughts',
          position: 'left',
        },
        {
          href: 'https://blog.shuye.dev',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://github.com/yechs',
          label: 'GitHub',
          position: 'right',
        },
      ],
      // hideOnScroll: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Thoughts',
              to: '/thoughts',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/yechs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ye Shu. Some Rights Reserved.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          editUrl: 'https://github.com/yechs/website/edit/master/',
          editLocalizedFiles: false,
          routeBasePath: 'kb',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
        },
        blog: {
          path: 'blog',
          editUrl: 'https://github.com/yechs/website/edit/master/blog/',
          blogTitle: 'Thoughts',
          blogDescription: 'Some short thoughts of mine',
          blogSidebarCount: 5,
          blogSidebarTitle: 'Recent Thoughts',
          routeBasePath: 'thoughts',
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          trailingSlash: false,
        },
      },
    ],
  ],
};
