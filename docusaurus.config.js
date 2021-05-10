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
          label: 'Knowledge Base',
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
        {
          href: 'https://www.linkedin.com/in/yechs/',
          label: 'LinkedIn',
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
              label: 'Thoughts',
              to: '/thoughts',
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
            {
              label: 'Blog',
              href: 'https://blog.shuye.dev/',
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
    gtag: {
      trackingID: 'G-M3X8PGC98D',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'kb',
          editUrl: 'https://github.com/yechs/website/edit/master/',
          editLocalizedFiles: false,
          routeBasePath: 'kb',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
        },
        blog: {
          path: 'thoughts',
          editUrl: 'https://github.com/yechs/website/edit/master/blog/',
          blogTitle: 'Thoughts',
          blogDescription: 'Some thoughts from Ye Shu',
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
