interface AwardRecord {
  title: string;
  context: string;
  years: string;
  // Trusted, repository-authored inline HTML; rendered inside a paragraph.
  // Do not populate this field from external or user-submitted content.
  description?: string;
}

// Sources: repository-root cv.pdf (April 2026), and publication recognition.
export const recognition: readonly AwardRecord[] = [
  {
    title: 'Distinguished Paper Award',
    context: 'IEEE Symposium on Security and Privacy',
    years: '2026',
    description:
      'For our paper <a href="https://sp2026.ieee-security.org/awards_papers.html">Lost in Translation: Text Message Spoofing via Email</a>.',
  },
  {
    title: 'CRA Outstanding Undergraduate Researcher',
    context: 'Honorable Mention',
    years: '2024',
    description:
      'Featured in this <a href="https://sparc.cra.org/helping-computer-science-research-by-improving-online-surveys/">CRA-E SPARC article</a>.',
  },
  {
    title: 'Sam Goldberg Colloquium Prize',
    context: 'Williams College',
    years: '2024',
    description: 'For the best computer science thesis presentation.',
  },
];
