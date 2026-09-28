import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import News from '../components/News';
import Service from '../components/Service';
import HomepageCardsContent from '../data/HomepageCardsContent';
import HomepageNewsContent from '../data/HomepageNews';
import HomepageServiceContent from '../data/HomepageService';
import styles from './index.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

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

function Publications() {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Publications</h2>
      <ul className={styles.paperListing}>
        <li>
          <h3 className={styles.paperTitle}>
            The Case of the Missing Cases: Inferring Sealed U.S. Federal Cases
          </h3>
          <div className={styles.paperInfo}>
            <small>
              <u>
                <b>Ye Shu</b>
              </u>
              , Elisa Luo, Paul Chung, Geoffrey M. Voelker, Stefan Savage
            </small>
            <br />
            In: <b>ACM Internet Measurement Conference 2026 (IMC 2026)</b>.{' '}
            <span className={styles.paperLinks}>
              <a href={useBaseUrl('papers/IMC26-Sealed.pdf')}>
                [PDF (Accepted Version)]
              </a>
            </span>
          </div>
        </li>
        <li>
          <h3 className={styles.paperTitle}>
            Lost in Translation: Text Message Spoofing via Email
          </h3>
          <div className={styles.paperInfo}>
            <small>
              Sumanth Rao,{' '}
              <u>
                <b>Ye Shu</b>
              </u>
              , Stefan Savage, Aaron Schulman, Geoffrey M. Voelker, Enze Liu
            </small>
            <br />
            In: <b>IEEE Security & Privacy 2026</b>. Won{' '}
            <b className={styles.award}>
              <FontAwesomeIcon icon={faTrophy} aria-hidden="true" />{' '}
              Distinguished Paper Award
            </b>
            .{' '}
            <span className={styles.paperLinks}>
              <a href="https://ieeexplore.ieee.org/document/11573623">
                [PDF (IEEE Xplore)]
              </a>{' '}
              <a href="https://www.sysnet.ucsd.edu/~voelker/pubs/sms-spoof-oakland26.pdf">
                [PDF (Accepted Version)]
              </a>
            </span>
            <div className={styles.paperResourceLinks}>
              <b>Vulnerability:</b>{' '}
              <a href="https://support.apple.com/en-us/125884">
                [CVE-2025-46311]
              </a>{' '}
              <b>News:</b>{' '}
              <a href="https://techxplore.com/news/2026-06-verizon-apple-hidden-texting-flaw.html">
                [TechXplore]
              </a>{' '}
              <a href="https://today.ucsd.edu/story/from-verizon-to-apple-a-hidden-texting-flaw-has-finally-been-patched">
                [UCSD News]
              </a>
            </div>
          </div>
        </li>
        <li>
          <h3 className={styles.paperTitle}>
            Poster: When Blocks Go Missing: The Timeliness and Trustworthiness
            of Blockchain RPC Providers
          </h3>
          <div className={styles.paperInfo}>
            <small>
              <u>
                <b>Ye Shu</b>
              </u>
              , Deian Stefan, Stefan Savage, Geoffrey M. Voelker, Enze Alex Liu.
            </small>
            <br />
            Poster at <b>ACM Internet Measurement Conference 2025 (IMC 2025)</b>
            ; also presented at the IMC Student Workshop 2025.{' '}
            <span className={styles.paperLinks}>
              <a href="https://dl.acm.org/doi/10.1145/3730567.3768594">
                [PDF (ACM DL)]
              </a>{' '}
              <a href={useBaseUrl('papers/bsc-rpc-imc25.pdf')}>
                [PDF (Accepted Version)]
              </a>
            </span>
          </div>
        </li>
        <li>
          <h3 className={styles.paperTitle}>
            RESTAssured: Formally Verifying RESTful API Specification
            Conformance in Web Applications
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
              <i>Undergraduate Honors Thesis.</i>
            </b>{' '}
            Williams College. 2024. Won <b>Highest Honors</b> and the{' '}
            <b>Goldberg Colloquium Prize for Best CS Thesis Defense.</b>{' '}
            <span className={styles.paperLinks}>
              <a href={useBaseUrl('papers/RESTAssured-thesis.pdf')}>[PDF]</a>{' '}
              <a href="https://doi.org/10.36934/TR2024_234">
                [Williams College Library]
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
              <a href="https://2024.plateau-workshop.org/program">[Workshop]</a>{' '}
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
        <Publications />
        <RecentNews />
        <ServiceHistory />
        {/* <HomepageCardGrid /> */}
      </main>
    </Layout>
  );
}
