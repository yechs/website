import type { NewsItem } from '../components/News';

const HomepageNewsContent: readonly NewsItem[] = [
  {
    id: 'amazon-spi-internship',
    date: '2026/09/18',
    content: (
      <>
        I am interning as an Applied Scientist at Amazon with the Special
        Projects and Investigations (SPI) team to help detect fraud and abuse at
        scale on <a href="https://www.amazon.com/">Amazon.com</a>.
      </>
    ),
  },
  {
    id: 'ucsd-cse-127-ta-2025',
    date: '2025/09/22',
    content: (
      <>
        I am TAing for{' '}
        <a href="https://cseweb.ucsd.edu/classes/fa25/cse127-a/">
          CSE 127: Computer Security
        </a>{' '}
        this fall.
      </>
    ),
  },
  {
    id: 'cra-e-research-highlights-2025',
    date: '2025/03/05',
    content: (
      <>
        I am featured in this{' '}
        <a href="https://sparc.cra.org/helping-computer-science-research-by-improving-online-surveys/">
          CRA-E Undergraduate Research Highlights article
        </a>{' '}
        in which I talk about my undergraduate research experience and my
        SureVeyor project.
      </>
    ),
  },
  {
    id: 'ucsd-phd-start-2024',
    date: '2024/09/23',
    content: <>I started my PhD studies at UCSD!</>,
  },
  {
    id: 'williams-graduation-2024',
    date: '2024/06/02',
    content: (
      <>
        I graduated{' '}
        <a href="https://commencement.williams.edu/commencement-2024/program-2024/latin-honors-2024/">
          cum laude
        </a>{' '}
        from Williams College with{' '}
        <a href="https://commencement.williams.edu/commencement-2024/program-2024/departmental-honors-2024/">
          <b>highest honors</b>
        </a>{' '}
        in Computer Science! I was also{' '}
        <a href="https://commencement.williams.edu/commencement-2024/program-2024/sigma-xi-2024/">
          inducted into Sigma Xi
        </a>
        , the Scientific Research Honor Society.
      </>
    ),
  },
  {
    id: 'thesis-defense-2024',
    date: '2024/05/14',
    content: (
      <>
        I defended my <a href="https://doi.org/10.36934/TR2024_234">thesis</a>,
        in which I used symbolic execution to formally verify conformance of
        Express.JS programs to OpenAPI specifications. The presentation was
        awarded{' '}
        <a href="https://commencement.williams.edu/fellowships-and-prizes-2024/">
          Sam Goldberg Colloquium Prize in Computer Science
        </a>{' '}
        for <b>best thesis defense</b>.
      </>
    ),
  },
  {
    id: 'cra-honorable-mention-2023',
    date: '2023/12/20',
    content: (
      <>
        I was selected for an <b>Honorable Mention</b> in the 2024 Computing
        Research Association (CRA)&apos;s{' '}
        <a href="https://cra.org/crae/awards/cra-outstanding-undergraduate-researchers/">
          <b>Outstanding Undergraduate Researcher Award (URA)</b>
        </a>
        !
      </>
    ),
  },
  {
    id: 'sureveyor-plateau-acceptance-2023',
    date: '2023/12/13',
    content: (
      <>
        My Sureveyor paper has been <b>accepted</b> to the workshop{' '}
        <a href="https://2024.plateau-workshop.org/">PLATEAU 2024</a>! I am
        going to <b>present</b> it in person at UC Berkeley this February.
      </>
    ),
  },
];

export default HomepageNewsContent;
