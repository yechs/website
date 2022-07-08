import React from 'react';
import Layout from '@theme/Layout';
import Gallery from '../components/Gallery';
import images from '../data/GalleryImages';

import '../css/page.css';

export default function GalleryPage(): JSX.Element {
  return (
    <Layout
      title={`Gallery`}
      description="The personal website of Ye Shu, an undergraduate at Williams College who is enthusiastic in Computer Science, especially in Information Security and Communications"
    >
      <main className={`mainContainer`}>
        <div
          className="container margin-vert--lg"
          style={{ textAlign: 'center' }}
        >
          <h1 className="hero__title">Gallery</h1>
          <Gallery images={images} />
        </div>
      </main>
    </Layout>
  );
}
