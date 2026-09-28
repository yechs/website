import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { PublicationItem } from '../components/Publications';
import styles from '../pages/index.module.css';

const HomepagePublicationsContent: readonly PublicationItem[] = [
  {
    content: (
      <>
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
            <a href="papers/IMC26-Sealed.pdf">[PDF (Accepted Version)]</a>
          </span>
        </div>
      </>
    ),
  },
  {
    content: (
      <>
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
            <FontAwesomeIcon
              className={styles.awardIcon}
              icon={faTrophy}
              aria-hidden="true"
            />{' '}
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
      </>
    ),
  },
  {
    content: (
      <>
        <h3 className={styles.paperTitle}>
          Poster: When Blocks Go Missing: The Timeliness and Trustworthiness of
          Blockchain RPC Providers
        </h3>
        <div className={styles.paperInfo}>
          <small>
            <u>
              <b>Ye Shu</b>
            </u>
            , Deian Stefan, Stefan Savage, Geoffrey M. Voelker, Enze Alex Liu.
          </small>
          <br />
          Poster at <b>ACM Internet Measurement Conference 2025 (IMC 2025)</b>;
          also presented at the IMC Student Workshop 2025.{' '}
          <span className={styles.paperLinks}>
            <a href="https://dl.acm.org/doi/10.1145/3730567.3768594">
              [PDF (ACM DL)]
            </a>{' '}
            <a href="papers/bsc-rpc-imc25.pdf">[PDF (Accepted Version)]</a>
          </span>
        </div>
      </>
    ),
  },
  {
    content: (
      <>
        <h3 className={styles.paperTitle}>
          RESTAssured: Formally Verifying RESTful API Specification Conformance
          in Web Applications
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
            <a href="papers/RESTAssured-thesis.pdf">[PDF]</a>{' '}
            <a href="https://doi.org/10.36934/TR2024_234">
              [Williams College Library]
            </a>
          </span>
        </div>
      </>
    ),
  },
  {
    content: (
      <>
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
      </>
    ),
  },
  {
    content: (
      <>
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
      </>
    ),
  },
];

export default HomepagePublicationsContent;
