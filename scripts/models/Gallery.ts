export interface Gallery {
  title: string;
  slug: string;
  images: GalleryImage[];
}

export interface GalleryImage {
  title: string;
  thumbPath: string;
  fullSizePath: string;
}

export interface GalleriesByLocale {
  nl: Gallery[];
  en: Gallery[];
  fr: Gallery[];
}
