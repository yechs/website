interface ResearchThread {
  title: string;
  paragraphs: readonly string[];
  links?: readonly { label: string; href: string }[];
}

export const researchThreads: readonly ResearchThread[] = [
  {
    title: 'Fingerprinting & Online Abuse',
    paragraphs: [
      'I study browser and network fingerprinting in the context of online abuse, including anti-detect browsers, residential proxies, and related infrastructure. My current work explores measurement and analysis techniques for understanding these systems at scale and improving practical abuse detection.',
    ],
  },
  {
    title: 'Measurement & Empirical Security',
    paragraphs: [
      'How can we measure phenomena in real-world systems when direct ground truth is incomplete, hidden, or expensive to obtain? I develop measurement and inference methods that combine indirect evidence, side channels, active measurements, and reconciliation across independent data sources.',
    ],
    // links: [{ label: 'Related publications', href: '#publications' }],
  },
];
