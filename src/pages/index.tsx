import React, { ReactElement } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';

// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Card from '../components/Card';
import type { CardProps } from '../components/Card';
import CardGrid from '../components/CardGrid';
import HomepageCardsContent from '../data/HomepageCardsContent';

import News from '../components/News';
import HomepageNewsContent from '../data/HomepageNews';

function HomepageHeader() {
  // const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Ye Shu (@yechs)</h1>
        <p className="hero__subtitle">Welcome to my website!</p>
        <Avatar />
      </div>
    </header>
  );
}

function Avatar(): ReactElement {
  return (
    <div className="text--center">
      <img
        className={styles.avatar}
        src={useBaseUrl('img/yechs.jpeg')}
        alt={'Avatar'}
      />
    </div>
  );
}

function AboutMe(): ReactElement {
  return (
    <>
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div>
          <p>
            I am a senior at <a href="https://williams.edu">Williams College</a>
            , majoring in{' '}
            <a href="https://csci.williams.edu/">Computer Science</a> and{' '}
            <a href="https://philosophy.williams.edu">Philosophy</a>. I am
            broadly interested in Computer Security, Network Systems, and
            Programming Languages. I seek to combine formal and empirical
            methods to combat network and software security issues. I am
            currently looking for PhD opportunities in these areas. If you want
            to talk, feel free to reach out at{' '}
            <code>ys5 [at] williams [dot] edu</code>!
          </p>
          <p>
            Currently I am working on my thesis, which explores formal
            guarantees on Web API-related codes. For the past summer, I have
            been working on novel censorship-resistant bootstrapping methods for
            network proxies with <a href="https://ensa.fi">Prof. Roya Ensafi</a>{' '}
            at <a href="https://umich.edu">University of Michigan</a>. Before
            that, I worked with{' '}
            <a href="https://www.cs.williams.edu/~dbarowy/">
              Prof. Daniel Barowy
            </a>{' '}
            and{' '}
            <a href="https://https://emeryberger.com/">Prof. Emery Berger</a> on
            SureVeyor—a domain specific language and runtime system that
            constructs randomized, replicable, confound-controlling behavioral
            surveys and returns noise-free responses.
          </p>
          <p>
            I am a Linuxer and{' '}
            <a href="https://wiki.archlinux.org/title/arch_is_the_best">
              &quot;BTW I Use Arch&quot;
            </a>{' '}
            (XD). I went distro-hopping for a long time, before getting into{' '}
            <a href="https://wiki.archlinux.org/title/Arch_Linux#Principles">
              the Arch philosophy
            </a>
            . It is now my invaluable partner in various open source
            contributions, which you can find on{' '}
            <a href="https://github.com/yechs">my GitHub profile</a>. I am also
            a security and privacy paranoid.
          </p>
          <p>
            Within the philosophical domain, I am fascinated about epistemology
            and philosophy of science. I am heavily influenced by the
            philosophical traditions of{' '}
            <a href="https://plato.stanford.edu/entries/skepticism/">
              skepticism
            </a>
            ,{' '}
            <a href="https://plato.stanford.edu/entries/relativism/">
              relativism
            </a>
            , and{' '}
            <a href="https://plato.stanford.edu/entries/pragmatism/">
              pragmatism
            </a>
            . Some of my favorite philosophers are{' '}
            <a href="https://plato.stanford.edu/entries/hume/">David Hume</a>,{' '}
            <a href="https://plato.stanford.edu/entries/thomas-kuhn/">
              Thomas Kuhn
            </a>
            ,{' '}
            <a href="https://plato.stanford.edu/entries/feyerabend/">
              Paul Feyerabend
            </a>
            , and{' '}
            <a href="https://en.wikipedia.org/wiki/Daniel_Dennett">
              Daniel Dennett
            </a>
            . Many have also nudged me to read{' '}
            <a href="https://plato.stanford.edu/entries/dewey/">John Dewey</a>,
            which I have yet to do. Generally speaking, I am always curious in
            what we know, how our beliefs are justified, and whether we can
            build cognizant machines (read: AI).
          </p>
        </div>
      </section>
    </>
  );
}

function RecentNews(): ReactElement {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Recent News</h2>
      <div>
        <News news={HomepageNewsContent} />
      </div>
    </section>
  );
}

function Publications(): ReactElement {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Publications</h2>
      <ul className={styles.paperListing}>
        <li>
          <h3 className={styles.paperTitle}>
            3 Other Manuscripts In Preparation
          </h3>
          <div className={styles.paperInfo}>
            <small>
              Respectively on the topics of network data plane verification,
              formal verification of RESTful APIs, and censorship resistance.
            </small>
            <br />
            Contact me for details if you are interested.
          </div>
        </li>
        <li>
          <h3 className={styles.paperTitle}>
            SureVeyor: A Language for High-Quality Online Surveys
          </h3>
          <div className={styles.paperInfo}>
            <small>
              <u>
                <b>Ye Shu</b>
              </u>
              , Emmie Hine, Hugo Hua, Emery Berger, Daniel Barowy.
            </small>
            <br />
            <b>
              <i>To Appear:</i>
            </b>{' '}
            PLATEAU 2024. [Contact me for preprint]
          </div>
        </li>
        <li>
          <h3 className={styles.paperTitle}>
            Binary Reed-Solomon Coding Based Distributed Storage Scheme in
            Information-Centric Fog Networks
          </h3>
          <div className={styles.paperInfo}>
            <small>
              <u>
                <b>Ye Shu</b>
              </u>
              , Mianxiong Dong, Kaoru Ota, Jun Wu, Siyi Liao.
            </small>
            <br />
            <b>
              <i>In:</i>
            </b>{' '}
            IEEE CAMAD 2018.{' '}
            <a href="https://ieeexplore.ieee.org/document/8514998">
              [PDF (IEEE Xplore)]
            </a>
          </div>
        </li>
      </ul>
    </section>
  );
}

function HomepageCardGrid(): ReactElement {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Miscellaneous</h2>
      <CardGrid>
        {HomepageCardsContent.map((props: CardProps, idx) => (
          <Card
            key={idx}
            title={props.title}
            img={props.img}
            imgAlt={props.imgAlt}
            caption={props.caption}
          >
            {props.children}
          </Card>
        ))}
      </CardGrid>
    </section>
  );
}

export default function Home(): ReactElement {
  // const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Ye Shu (@yechs)`}
      description="The personal website of Ye Shu, an undergraduate at Williams College who is enthusiastic in Computer Science, especially in Information Security and Communications"
    >
      <HomepageHeader />
      <main>
        <AboutMe />
        <RecentNews />
        <Publications />
        <HomepageCardGrid />
      </main>
    </Layout>
  );
}
