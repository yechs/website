interface PublicationLink {
  label: string;
  href?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: readonly string[];
  venue: string;
  venueShort?: string;
  year: number;
  type: 'conference' | 'workshop' | 'poster' | 'thesis';
  selected?: boolean;
  award?: string;
  links: readonly PublicationLink[];
  tldr?: string;
  highlight?: string;
}

export const publications: readonly Publication[] = [
  {
    id: 'missing-cases-imc-2026',
    title: 'The Case of the Missing Cases: Inferring Sealed U.S. Federal Cases',
    authors: [
      'Ye Shu',
      'Elisa Luo',
      'Paul Chung',
      'Geoffrey M. Voelker',
      'Stefan Savage',
    ],
    venue: 'ACM Internet Measurement Conference',
    venueShort: 'IMC 2026',
    year: 2026,
    type: 'conference',
    selected: true,
    links: [
      {
        label: 'ACM DL',
        href: 'https://dl.acm.org/doi/10.1145/3777912.3839786',
      },
      { label: 'Paper', href: '/papers/IMC26-Sealed.pdf' },
    ],
    tldr: 'We develop and validate inference techniques for measuring current and historical U.S. federal court case sealing practices.',
    highlight:
      'These techniques enable large-scale studies of a secretive judicial process using free data, revealing hidden patterns with civil and magistrate judge cases.',
  },
  {
    id: 'sms-spoof-oakland-2026',
    title: 'Lost in Translation: Text Message Spoofing via Email',
    authors: [
      'Sumanth Rao',
      'Ye Shu',
      'Stefan Savage',
      'Aaron Schulman',
      'Geoffrey M. Voelker',
      'Enze Liu',
    ],
    venue: 'IEEE Symposium on Security and Privacy',
    venueShort: 'IEEE S&P 2026',
    year: 2026,
    type: 'conference',
    selected: true,
    award: 'Distinguished Paper Award',
    links: [
      {
        label: 'IEEE Xplore',
        href: 'https://ieeexplore.ieee.org/document/11573623',
      },
      {
        label: 'Paper',
        href: 'https://www.sysnet.ucsd.edu/~voelker/pubs/sms-spoof-oakland26.pdf',
      },
      {
        label: 'CVE-2025-46311',
        href: 'https://support.apple.com/en-us/125884',
      },
      {
        label: 'UC San Diego News',
        href: 'https://today.ucsd.edu/story/from-verizon-to-apple-a-hidden-texting-flaw-has-finally-been-patched',
      },
      {
        label: 'PhoneArena',
        href: 'https://www.phonearena.com/news/email-to-text-bug-at-t-t-mobile-verizon_id180940',
      },
      {
        label: 'Consumer Affairs',
        href: 'https://www.consumeraffairs.com/news/researchers-say-theyve-patched-a-security-flaw-in-apple-and-android-phones-060926.html',
      },
    ],
    tldr: 'We show how email-to-text gateways and messaging apps enable spoofing of arbitrary senders and injection of forged messages into existing conversations.',
    highlight:
      'The attacks expose an end-to-end identity failure that emerges when independently designed messaging protocols and systems are connected together.',
  },
  {
    id: 'blockchain-rpc-imc-2025',
    title:
      'Poster: When Blocks Go Missing: The Timeliness and Trustworthiness of Blockchain RPC Providers',
    authors: [
      'Ye Shu',
      'Deian Stefan',
      'Stefan Savage',
      'Geoffrey M. Voelker',
      'Enze Alex Liu',
    ],
    venue: 'ACM Internet Measurement Conference (Poster)',
    venueShort: 'IMC 2025',
    year: 2025,
    type: 'poster',
    selected: true,
    links: [
      {
        label: 'ACM DL',
        href: 'https://dl.acm.org/doi/10.1145/3730567.3768594',
      },
      { label: 'Paper', href: '/papers/bsc-rpc-imc25.pdf' },
    ],
    tldr: 'We measure blockchain RPC providers and found substantial differences in timeliness, missing records, and even internal inconsistency.',
    highlight:
      'Applications implicitly trust RPC providers as faithful representations of the chain state; our measurements challenge that assumption.',
  },
  {
    id: 'restassured-2024',
    title:
      'RESTAssured: Formally Verifying RESTful API Specification Conformance in Web Applications',
    authors: ['Ye Shu'],
    venue: 'Williams College undergraduate honors thesis',
    year: 2024,
    type: 'thesis',
    selected: false,
    award: 'Highest Honors and Sam Goldberg Colloquium Prize',
    links: [
      {
        label: 'Williams College Library',
        href: 'https://doi.org/10.36934/TR2024_234',
      },
      { label: 'Thesis PDF', href: '/papers/RESTAssured-thesis.pdf' },
    ],
    tldr: 'RESTAssured uses symbolic execution to verify whether Express.js servers conform to their OpenAPI specifications.',
    highlight:
      'It makes API specifications mechanically checkable against actual implementations, catching discrepancies that would otherwise be missed by traditional testing and fuzzing techniques.',
  },
  {
    id: 'sureveyor-plateau-2024',
    title: 'SureVeyor: A Language for High-Quality Online Surveys',
    authors: [
      'Ye Shu',
      'Emmie Hine',
      'Hugo Hua',
      'Emery Berger',
      'Daniel Barowy',
    ],
    venue: 'PLATEAU Workshop',
    year: 2024,
    type: 'workshop',
    tldr: 'SureVeyor is a domain-specific language for expressing online surveys with controls for survey-design confounds and automatic detection of low-quality responses.',
    highlight:
      'It tackles two major sources of noise in online surveys with built-in language features.',
    links: [
      {
        label: 'Workshop Program',
        href: 'https://2024.plateau-workshop.org/program',
      },
      {
        label: 'CRA-E research highlight',
        href: 'https://sparc.cra.org/helping-computer-science-research-by-improving-online-surveys/',
      },
      { label: 'Contact me for paper' },
    ],
  },
  {
    id: 'reed-solomon-camad-2018',
    title:
      'Binary Reed-Solomon Coding Based Distributed Storage Scheme in Information-Centric Fog Networks',
    authors: ['Ye Shu', 'Mianxiong Dong', 'Kaoru Ota', 'Jun Wu', 'Siyi Liao'],
    venue: 'IEEE CAMAD Workshop',
    year: 2018,
    type: 'workshop',
    links: [
      {
        label: 'Conference',
        href: 'https://camad2018.ieee-camad.org/program/index.html',
      },
      {
        label: 'IEEE Xplore',
        href: 'https://ieeexplore.ieee.org/document/8514998',
      },
    ],
  },
];
