export interface Gallery {
  title: string;
  title_en: string;
  title_fr: string;
  slug: string;
  images: GalleryImage[];
}

export interface GalleryImage {
  title: string;
  asset: string;
  thumbPath: string;
  fullSizePath: string;
}
