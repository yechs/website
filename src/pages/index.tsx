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
            I am a first-year Computer Science PhD student advised by Prof.{' '}
            <a href="https://cseweb.ucsd.edu/~savage/">Stefan Savage</a> and
            Prof. <a href="https://cseweb.ucsd.edu/~voelker/">Geoff Voelker</a>{' '}
            at University of California, San Diego. I am broadly interested in
            Security, Network Systems, and Programming Languages. I seek to
            combine formal and empirical methods to combat network security
            issues.
          </p>
          <p>
            Before joining UCSD, I was a{' '}
            <a href="https://csci.williams.edu/">Computer Science</a> and{' '}
            <a href="https://philosophy.williams.edu">Philosophy</a> double
            major at <a href="https://williams.edu">Williams College</a>, where
            I worked with Prof.{' '}
            <a href="https://www.cs.williams.edu/~dbarowy/">Daniel Barowy</a> on
            various Programming Language topics. We used symbolic execution to
            formally verify conformance to OpenAPI specifications and also
            developed a domain specific language for online surveys (in
            collaboration with Prof.{' '}
            <a href="https://emeryberger.com/">Emery Berger</a>). In addition, I
            have spent a summer working with Prof.{' '}
            <a href="https://ensa.fi">Roya Ensafi</a> at{' '}
            <a href="https://umich.edu">University of Michigan</a>, where we
            proposed a novel censorship-resistant bootstrapping methods for
            network proxies.
          </p>
          <p>
            Within the philosophical domain, I am fascinated about epistemology,
            philosophy of science, and philosophy of mind. In English, they are
            just fancy terms for what we know, how our beliefs are justified,
            and whether we can build cognizant machines (read: AI). I am heavily
            influenced by the philosophical traditions of{' '}
            <a href="https://plato.stanford.edu/entries/skepticism/">
              skepticism
            </a>{' '}
            and{' '}
            <a href="https://plato.stanford.edu/entries/relativism/">
              relativism
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
            .
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
              domain specific language for online surveys, and censorship
              resistance.
            </small>
            <br />
            Contact me for details if you are interested.
          </div>
        </li>
        <li>
          <h3 className={styles.paperTitle}>
            RESTAssured: Formally Verifying RESTful API Specification
            Conformance in Server-side Web Applications
          </h3>
          <div className={styles.paperInfo}>
            <small>
              <u>
                <b>Ye Shu</b>
              </u>
              . Advised by Daniel Barowy.
            </small>
            <br />
            <b>
              <i>Undergraduate Honor Thesis.</i>
            </b>{' '}
            Williams College. 2024. Won <b>Heighest Honors</b> and{' '}
            <b>Goldberg Colloquium Prize for Best CS Thesis Defense.</b>{' '}
            <span className={styles.paperLinks}>
              <a href="https://doi.org/10.36934/TR2024_234">
                [PDF (Williams College)]
              </a>
            </span>
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
              <i>Presented At:</i>
            </b>{' '}
            PLATEAU 2024.{' '}
            <span className={styles.paperLinks}>
              <a href="https://2024.plateau-workshop.org/program">
                [Conference]
              </a>{' '}
              [Contact me for paper]
            </span>
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
            <span className={styles.paperLinks}>
              <a href="https://camad2018.ieee-camad.org/program/index.html">
                [Conference]
              </a>{' '}
              <a href="https://ieeexplore.ieee.org/document/8514998">
                [PDF (IEEE Xplore)]
              </a>
            </span>
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
