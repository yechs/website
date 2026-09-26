import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

import { MasonryPhotoAlbum } from 'react-photo-album';
import type { Photo as PhotoAlbumImage } from 'react-photo-album';
import 'react-photo-album/masonry.css';

import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

export interface GalleryProps {
  images: readonly Image[];
}

export interface ImageSource {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

export interface Image extends ImageSource {
  readonly title?: string;
  readonly description?: string | ReactNode;
  readonly srcSet?: readonly ImageSource[];
  readonly alt?: string;
}

type NormalizedImage = PhotoAlbumImage & {
  readonly description?: string | ReactNode;
  readonly alt: string;
  readonly label: string;
};

function Gallery({ images }: GalleryProps) {
  const [photoIndex, setPhotoIndex] = useState(-1);
  const { withBaseUrl } = useBaseUrlUtils();
  const normalizedImages = useMemo<readonly NormalizedImage[]>(
    () =>
      images.map((image, index) => {
        const alt = image.alt ?? image.title ?? `Gallery photo ${index + 1}`;

        return {
          ...image,
          src: withBaseUrl(image.src),
          srcSet: image.srcSet?.map((source) => ({
            ...source,
            src: withBaseUrl(source.src),
          })),
          key: image.src,
          alt,
          label: `Open ${alt} in lightbox`,
        };
      }),
    [images, withBaseUrl],
  );

  return (
    <>
      <MasonryPhotoAlbum
        photos={normalizedImages}
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
        slides={normalizedImages}
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
