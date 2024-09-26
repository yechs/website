import React from 'react';
import Link from '@docusaurus/Link';

import type { CardProps } from '../components/Card';

const HomepageCardsContent: CardProps[] = [
  {
    title: 'Outdated Contents 🚧',
    children: <p>These cards haven&apos;t been updated since 2020.</p>,
  },
  {
    title: 'Hello 👋',
    children: (
      <p>
        I am Ye Shu, a self-proclaimed geek who is enthusiastic in Computer
        Science, especially in the fields of Information Security and Computer
        Networking.
      </p>
    ),
  },
  {
    title: 'Education',
    children: (
      <p>
        I&apos;m now an undergraduate at Williams College, the #1 Liberal Arts
        College in US and plan to study in various areas including CS,
        philosophy and maths. I studied{' '}
        <Link to="https://www.ibo.org/programmes/diploma-programme/">IBDP</Link>{' '}
        in high school and scored 45 (full score) upon graduation.
      </p>
    ),
  },
  {
    title: 'Tech Stack',
    children: (
      <p>
        I&apos;m mostly proficient in Golang and Python, though I&apos;m also
        used to TypeScript/JavaScript, C, PHP,... In addition, I typeset mostly
        (if not entirely) in Markdown and LaTeX.{' '}
        <Link to="https://archlinux.org">BTW I use Arch</Link>.
      </p>
    ),
  },
  {
    title: 'Open Source',
    children: (
      <p>
        I&apos;m a believer in free and open source software (FOSS) and copyleft
        movement. Most of my works are open sourced if possible so others can
        potentially benefit from them. The source code for this website can be
        found <Link to="https://github.com/yechs/website">here on GitHub</Link>.
      </p>
    ),
  },
  {
    title: 'CTF & Hackathons',
    children: (
      <p>
        I&apos;m member and co-founder of{' '}
        <Link to="https://ctftime.org/team/130585">Team 0x194</Link> and
        specialize in forensics and crypto. I also organized{' '}
        <Link to="https://thehack.org.cn">THE Hack</Link>, a series of hackathon
        events in China.
      </p>
    ),
  },
  {
    title: 'Machine Learning',
    children: (
      <p>
        I enjoy employing Machine Learning to solve real-life problems. I once
        attempted to semantically analyze Android application bytecodes through
        Skip-Gram and LSTM and have also experimented deep reinforcement
        learning for intraday trading on Shenzhen Stock Exchange.
      </p>
    ),
  },
  {
    title: 'Web Developing',
    children: (
      <p>
        I&apos;m a seasoned Web developer who started building websites{' '}
        <Link to="blog/welcome">since 2014</Link> and am familiar to both MVC
        and MMVM. I used to program in PHP Laravel mostly but have transitioned
        to Go+React in recent years.
      </p>
    ),
  },
  {
    title: 'Port Scanners',
    children: (
      <p>
        In one of my past internships, I specialized in the studies of port
        scanners, getting into the principles of network protocols like TCP/UDP
        and IPv4/v6. You can find{' '}
        <Link to="https://docs.google.com/presentation/d/1u0SyR6BCE-A3X-Usn9Og6v-Ga8Wgeyka8Wj0857GoMU">
          the slide here
        </Link>{' '}
        for a talk I gave at that time.
      </p>
    ),
  },
  {
    title: "What's up?",
    children: (
      <p>
        I&apos;ve been obsessed with amateur radio recently and wonders if I can
        receive a call sign before September.
      </p>
    ),
  },
  {
    title: 'Contact Me',
    children: (
      <>
        <p>You can solve this little challenge to find my email address : )</p>
        <pre>aGVsbG9Ac2h1eWUuZGV2</pre>
      </>
    ),
  },
];

export default HomepageCardsContent;
