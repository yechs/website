import React, { useState } from 'react';

import PhotoAlbum from 'react-photo-album';
import type { Photo as PhotoAlbumImage } from 'react-photo-album';

import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

export interface GalleryProps {
  images: Image[];
}

export interface ImageSource {
  src: string;
  width: number; // pixels
  height: number; // pixels
}

export interface Image extends ImageSource {
  title?: string;
  description?: string | React.ReactNode; // for lightbox caption only
  srcSet?: ImageSource[];
  alt?: string;
}

function Gallery({ images }: GalleryProps): JSX.Element {
  const [photoIndex, setPhotoIndex] = useState<number>(-1);

  images.forEach((image, index) => {
    if (!image.alt) {
      image.alt = image.title ?? `Image ${index}`;
    }
  });

  const photoAlbumImages: PhotoAlbumImage[] = images.map((image) => ({
    ...image,
    key: image.src,
    images: image.srcSet,
  }));

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={photoAlbumImages}
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
        plugins={[Captions, Fullscreen, Zoom]}
        zoom={{
          maxZoomPixelRatio: 2,
          zoomInMultiplier: 2,
          scrollToZoom: false,
        }}
      />
    </>
  );
}

export default Gallery;
