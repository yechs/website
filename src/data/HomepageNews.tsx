import React from 'react';
import { NewsItem } from '../components/News';

const HomepageNewsContent: NewsItem[] = [
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
