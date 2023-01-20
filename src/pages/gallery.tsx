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
        <div className="container margin-vert--lg">
          <h1 className="hero__title" style={{ textAlign: 'center' }}>
            Gallery
          </h1>
          <p>
            Welcome to my photo gallery. It includes some of the pictures I have
            taken in the past and occasionally some taken by my friends. Most
            pictures come with a title and caption that you can see by clicking
            on it. Some of the pictures are taken by my friends. I have tried my
            best to give credit to them. If you are the photographer and are not
            properly credited, please contact me.
          </p>
          <p>
            As you scroll down, you&apos;ll find a variety of subjects:
            landscapes, street scenes, wild animals, ... While they are not
            works of professional photographers, they are the carriers of many
            personal insights and stories. With them, I capture and share
            certain pieces of my life, my perspective, and my feelings. I hope
            you enjoy them and find inspiration in them as well!
          </p>
          <p>
            All photos and images are protected under international copyright
            laws. No portion of these images may be used, copied, or reproduced
            without the express written consent of the copyright holder. The
            copyright holder is specified in the caption of each photo. If you
            would like to use any of the photos or images for personal or
            commercial use, please contact me or the copyright holder for
            permission.
          </p>
          <p>
            This page is still a work in progress. I plan to include the
            following features in the future:
            <ul>
              <li>Group and collapse photos by year</li>
              <li>Select the number of columns for display</li>
            </ul>
          </p>

          <Gallery images={images} />
        </div>
      </main>
    </Layout>
  );
}
