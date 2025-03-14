import React from 'react';
import { NewsItem } from '../components/News';

const HomepageNewsContent: NewsItem[] = [
  {
    date: '2025/03/05',
    content: (
      <>
        I am featured in this{' '}
        <a href="https://sparc.cra.org/helping-computer-science-research-by-improving-online-surveys/">
          CRA-E Undergraduate Research Highlights article
        </a>{' '}
        where I talk about my undergrad research experience and my SureVeyor
        project.
      </>
    ),
  },
  {
    date: '2024/09/23',
    content: <>I started my PhD studies at UCSD!</>,
  },
  {
    date: '2024/06/02',
    content: (
      <>
        I graudated{' '}
        <a href="https://commencement.williams.edu/commencement-2024/program-2024/latin-honors-2024/">
          cum laude
        </a>{' '}
        from Williams College with{' '}
        <a href="https://commencement.williams.edu/commencement-2024/program-2024/departmental-honors-2024/">
          <b>highest honors</b>
        </a>{' '}
        in Computer Science! I am also{' '}
        <a href="https://commencement.williams.edu/commencement-2024/program-2024/sigma-xi-2024/">
          inducted to Sigma Xi
        </a>
        , the Scientific Research Honor Society.
      </>
    ),
  },
  {
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
    date: '2023/12/20',
    content: (
      <>
        I am selected for <b>Honorable Mention</b> of the 2024 Computing
        Research Association (CRA)&apos;s{' '}
        <a href="https://cra.org/crae/awards/cra-outstanding-undergraduate-researchers/">
          <b>Outstanding Undergraduate Researcher Award (URA)</b>
        </a>
        !
      </>
    ),
  },
  {
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
