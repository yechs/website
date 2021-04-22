import React, { ReactElement } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Card from '../components/Card';
import type { CardProps } from '../components/Card';
import CardGrid from '../components/CardGrid';
import HomepageCardsContent from '../data/HomepageCardsContent';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Ye Shu (@yechs)</h1>
        <p className="hero__subtitle">Welcome to my website!</p>
        <Avatar />
        {/*<div className={styles.buttons}>*/}
        {/*  <Link*/}
        {/*    className="button button--secondary button--lg"*/}
        {/*    to="/docs/intro"*/}
        {/*  >*/}
        {/*    Docusaurus Tutorial - 5min ⏱️*/}
        {/*  </Link>*/}
        {/*</div>*/}
      </div>
    </header>
  );
}

function Avatar(): ReactElement {
  return (
    <div className="text--center">
      <img
        className={styles.avatar}
        src={useBaseUrl('static/img/yechs.jpeg')}
        alt={'Avatar'}
      />
    </div>
  );
}

function HomepageCardGrid(): ReactElement {
  return (
    <section>
      <h1 className={styles.sectionTitle}>A Little About Myself</h1>
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
        {/*<HomepageFeatures />*/}
        <HomepageCardGrid />
      </main>
    </Layout>
  );
}
