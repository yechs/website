import React, { useState } from 'react';

import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';

// Note: the line below does not work (as if the CSS has never been imported). However, I can copy the CSS file to a local directory `/src/css/yarl.css`. Importing from the local file will work as expected.
import 'yet-another-react-lightbox/styles.css';
// import '../../css/yarl.css';

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
        onClick={(_event, _photo, index) => setPhotoIndex(index)}
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