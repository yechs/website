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
