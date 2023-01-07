import React, { useState } from 'react';

import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export interface GalleryProps {
  images: Image[];
}

export interface Image {
  src: string;
  width: number;
  height: number;
  title?: string;
  description?: string;
}

function Gallery({ images }: GalleryProps): JSX.Element {
  const [photoIndex, setPhotoIndex] = useState<number>(-1);

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={images}
        columns={(containerWidth) => {
          if (containerWidth < 300) return 1;
          if (containerWidth < 600) return 2;
          if (containerWidth < 1200) return 3;
          return 4;
        }}
        onClick={({ index }) => setPhotoIndex(index)}
      />

      <Lightbox
        open={photoIndex >= 0}
        close={() => setPhotoIndex(-1)}
        slides={images}
        index={photoIndex}
      />
    </>
  );
}

export default Gallery;
