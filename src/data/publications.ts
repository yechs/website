export interface PublicationLink {
  label: string;
  href: string;
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
    links: [{ label: 'Paper', href: '/papers/IMC26-Sealed.pdf' }],
    tldr: 'We develop a large-scale measurement approach for identifying sealed cases in U.S. federal courts using public records and indirect evidence.',
    highlight:
      'The work shows how careful inference and validation can measure a phenomenon whose ground truth is intentionally difficult and expensive to observe.',
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
    ],
    tldr: 'We show how email-to-text translation can enable spoofed text messages across provider and messaging-system boundaries.',
    highlight:
      'The vulnerability emerged from interactions between multiple independently operated systems, illustrating why end-to-end measurement matters for deployed communications security.',
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
    venue:
      'ACM Internet Measurement Conference poster and IMC Student Workshop',
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
    tldr: 'We measure lag, missing records, and inconsistency in public blockchain RPC infrastructure.',
    highlight:
      'Applications often treat RPC providers as interchangeable views of a blockchain; our measurements test that assumption directly.',
  },
  {
    id: 'restassured-2024',
    title:
      'RESTAssured: Formally Verifying RESTful API Specification Conformance in Web Applications',
    authors: ['Ye Shu'],
    venue: 'Williams College undergraduate honors thesis',
    year: 2024,
    type: 'thesis',
    selected: true,
    award: 'Highest Honors and Sam Goldberg Colloquium Prize',
    links: [
      { label: 'Thesis', href: '/papers/RESTAssured-thesis.pdf' },
      {
        label: 'Library record',
        href: 'https://doi.org/10.36934/TR2024_234',
      },
    ],
    tldr: 'RESTAssured uses symbolic execution to verify whether Express applications conform to their OpenAPI specifications.',
    highlight:
      'It brings formal reasoning to the boundary between executable server code and the API contracts consumed by clients.',
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
    venue: 'PLATEAU 2024',
    year: 2024,
    type: 'workshop',
    links: [
      { label: 'Workshop', href: 'https://2024.plateau-workshop.org/program' },
    ],
  },
  {
    id: 'reed-solomon-camad-2018',
    title:
      'Binary Reed-Solomon Coding Based Distributed Storage Scheme in Information-Centric Fog Networks',
    authors: ['Ye Shu', 'Mianxiong Dong', 'Kaoru Ota', 'Jun Wu', 'Siyi Liao'],
    venue: 'IEEE CAMAD 2018',
    year: 2018,
    type: 'conference',
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
