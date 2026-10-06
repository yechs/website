interface TeachingRecord {
  title: string;
  context: string;
  years: string;
  description?: string;
  link?: string;
}

// Source: repository-root cv.pdf (April 2026).
export const teaching: readonly TeachingRecord[] = [
  {
    title: 'CSCI 23: Web Development',
    context: 'Co-Instructor · Williams College',
    years: 'Winter Study 2024',
    description:
      'A four-week course built around real projects from Williams Students Online, with Andrew Megalaa and Prof. Jeannie Albrecht.',
  },
  {
    title: 'CTF Security Workshop',
    context:
      'Co-Instructor · The Free University Program (Williams Students Union)',
    years: 'Winter Study 2022',
    description:
      'A hands-on workshop on network, web, cryptography, and binary-exploitation challenges, with Garett Tok Ern Liang.',
  },
];

export const teachingAssistantCourses: readonly TeachingRecord[] = [
  {
    title: 'CSE 127: Security',
    link: 'https://cseweb.ucsd.edu/classes/fa25/cse127-a/',
    context: 'UC San Diego',
    years: 'Fall 2025',
  },
  {
    title: 'CSCI 361: Theory of Computation',
    context: 'Williams College',
    years: 'Spring 2024',
  },
  {
    title: 'CSCI 432: Operating Systems',
    link: 'https://web.archive.org/web/20240227235423/https://www.cs.williams.edu/~jeannie/cs432/',
    context: 'Williams College',
    years: 'Fall 2023',
  },
  {
    title: 'CSCI 371: Computer Graphics',
    context: 'Williams College',
    years: 'Spring 2023',
  },
  {
    title: 'CSCI 256: Algorithms Design and Analysis',
    link: 'https://www.cs.williams.edu/~jannen/teaching/f22/cs256/',
    context: 'Williams College',
    years: 'Fall 2022',
  },
  {
    title: 'CSCI 237: Computer Organization',
    link: 'https://www.cs.williams.edu/~cs237/',
    context: 'Williams College',
    years: 'Spring 2022',
  },
  {
    title: 'CSCI 136: Data Structure and Advanced Programming',
    link: 'https://web.archive.org/web/20211127085348/https://www.cs.williams.edu/~cs136/',
    context: 'Williams College',
    years: 'Fall 2021',
  },
];
