import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import News from '../components/News';
import PublicationsList from '../components/Publications';
import Service from '../components/Service';
import HomepageCardsContent from '../data/HomepageCardsContent';
import HomepageNewsContent from '../data/HomepageNews';
import HomepagePublicationsContent from '../data/HomepagePublications';
import HomepageServiceContent from '../data/HomepageService';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={`hero hero--primary ${styles.heroBanner}`}>
      <div className="container">
        <h1 className="hero__title">Ye Shu</h1>
        <p className="hero__subtitle">
          CS PhD Student at UC San Diego | Security and Measurement Researcher
        </p>
        <Avatar />
      </div>
    </header>
  );
}

function Avatar() {
  return (
    <div className="text--center">
      <img
        className={styles.avatar}
        src={useBaseUrl('img/yechs.jpeg')}
        alt="Ye Shu"
        width="160"
        height="160"
      />
    </div>
  );
}

function AboutMe() {
  return (
    <>
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div>
          <p>
            I am a Computer Science PhD student advised by Profs.{' '}
            <a href="https://cseweb.ucsd.edu/~savage/">Stefan Savage</a> and{' '}
            <a href="https://cseweb.ucsd.edu/~voelker/">Geoff Voelker</a> at the{' '}
            <a href="https://cse.ucsd.edu/">
              University of California, San Diego
            </a>
            . My research interests include network security, Internet
            measurement, and network/browser fingerprinting. I build measurement
            and analysis systems that turn messy Internet-scale data into useful
            evidence about security and abuse. I am affiliated with the{' '}
            <a href="https://cseweb.ucsd.edu/~sysnet/">Sysnet</a> and{' '}
            <a href="https://cryptosec.ucsd.edu/">CryptoSec</a> research groups,
            the{' '}
            <a href="https://cns.ucsd.edu/">
              Center for Networked Systems (CNS)
            </a>
            , and the{' '}
            <a href="https://cyberhealth.ucsd.edu/">
              Center for Healcare Cybersecurity
            </a>{' '}
            at UCSD.
          </p>
          <p>
            Before joining UCSD, I was a{' '}
            <a href="https://csci.williams.edu/">Computer Science</a> and{' '}
            <a href="https://philosophy.williams.edu">Philosophy</a> double
            major at <a href="https://williams.edu">Williams College</a>, where
            I worked with Prof.{' '}
            <a href="https://www.cs.williams.edu/~dbarowy/">Daniel Barowy</a> on
            programming languages and formal methods. Within the philosophical
            domain, I am fascinated by epistemology, philosophy of science, and
            philosophy of mind. I am heavily influenced by the philosophical
            traditions of{' '}
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

function RecentNews() {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Recent News</h2>
      <div>
        <News news={HomepageNewsContent} />
      </div>
    </section>
  );
}

function ServiceHistory() {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Community & Academic Service</h2>
      <div>
        <Service services={HomepageServiceContent} />
      </div>
    </section>
  );
}

function PublicationsSection() {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Publications</h2>
      <PublicationsList publications={HomepagePublicationsContent} />
    </section>
  );
}

function HomepageCardGrid() {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>More About Me</h2>
      <CardGrid>
        {HomepageCardsContent.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </CardGrid>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Ye Shu"
      description="The personal website of Ye Shu, a computer science PhD student and researcher at UC San Diego, who works on network security, Internet measurement, and network/browser fingerprinting."
    >
      <HomepageHeader />
      <main>
        <AboutMe />
        <PublicationsSection />
        <RecentNews />
        <ServiceHistory />
        {/* <HomepageCardGrid /> */}
      </main>
    </Layout>
  );
}
