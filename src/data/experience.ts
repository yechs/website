interface TechnicalExperience {
  title: string;
  context: string;
  years: string;
  description: string;
}

export const technicalExperience: readonly TechnicalExperience[] = [
  {
    title: 'Amazon',
    context: 'Applied Scientist Intern',
    years: '2026',
    description:
      'I worked on marketplace abuse detection, translating investigator heuristics into explainable machine-learning models that were adopted across teams for abuse detection at scale.',
  },
  {
    title: 'Williams Students Online (WSO)',
    context: 'President / Full-stack Developer',
    years: '2020–2024',
    description:
      'I helped build and operate a campus platform used by about 70% of Williams students, serving as president and leading developer onboarding and ongoing maintenance.',
  },
];
