export interface ResearchTheme {
  title: string;
  description: string;
}

export interface ResearchProject {
  title: string;
  description: string;
  links?: readonly { label: string; href: string }[];
}

export const researchThemes: readonly ResearchTheme[] = [
  {
    title: 'Internet Measurement & Security',
    description:
      'Measuring security-relevant behavior and infrastructure at Internet scale, with an emphasis on deployed systems and their real-world consequences.',
  },
  {
    title: 'Fingerprinting & Online Abuse',
    description:
      'Understanding browser and network identity, anti-detect systems, residential proxies, and the infrastructure used to evade anti-abuse controls.',
  },
  {
    title: 'Measurement Methodology',
    description:
      'Designing inference and validation methods for phenomena whose ground truth is incomplete, indirect, expensive, or intentionally hidden.',
  },
];

export const researchProjects: readonly ResearchProject[] = [
  {
    title: 'Federal Court Sealing',
    description:
      'Large-scale measurement of sealed U.S. federal cases using public records, inference methods, validation against paid datasets, and timing side channels.',
    links: [{ label: 'Paper', href: '/papers/IMC26-Sealed.pdf' }],
  },
  {
    title: 'Anti-detect Browsers',
    description:
      'Research into tools that manipulate browser identity and their implications for fingerprinting, online abuse, and anti-abuse systems.',
  },
  {
    title: 'Blockchain RPC Reliability',
    description:
      'Measurement of lag, missing records, and inconsistency in the public RPC infrastructure that applications use to observe blockchains.',
    links: [
      {
        label: 'ACM DL',
        href: 'https://dl.acm.org/doi/10.1145/3730567.3768594',
      },
      { label: 'Paper', href: '/papers/bsc-rpc-imc25.pdf' },
    ],
  },
];
