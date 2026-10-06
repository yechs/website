interface ServiceItem {
  role: string;
  organization?: string;
  years: string;
  href?: string;
}

export const service: readonly ServiceItem[] = [
  {
    role: 'Shadow Technical Program Committee',
    organization: 'ACM Internet Measurement Conference',
    years: '2026',
  },
  {
    role: 'Artifact Evaluation Committee',
    organization: 'USENIX Security',
    years: '2026',
  },
  {
    role: 'Artifact Evaluation Committee',
    organization: 'ACM CoNEXT',
    years: '2026',
  },
  {
    role: 'CSE Department Representative',
    organization:
      'UC San Diego Graduate & Professional Student Association (GPSA) Council',
    years: '2026–present',
    href: 'https://gpsa.ucsd.edu/',
  },
  {
    role: 'Member',
    organization: 'UC San Diego CSE Graduate Student Council',
    years: '2025–present',
  },
  {
    role: 'Elected member',
    organization: 'Williams CS Student Activities/Advisory Committee',
    years: '2022–2024',
    href: 'https://web.archive.org/web/20240703125932/https://csci.williams.edu/people/students/cossac-computer-science-student-advisory-committee/',
  },
  {
    role: 'Mentor',
    organization: 'Williams Underrepresented Identities in CS',
    years: '2022–2024',
    href: 'https://web.archive.org/web/20240703163541/https://csci.williams.edu/people/students/unics/',
  },
  {
    role: 'Student volunteer',
    organization: 'ACM PLDI',
    years: '2022',
  },
];
