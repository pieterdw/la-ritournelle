export interface RawGallery {
  title: string;
  title_en: string;
  title_fr: string;
  slug: string;
  gallery: RawGalleryImage[];
}

export interface RawGalleryImage {
  meta: RawGalleryImageMeta;
  path: string;
}

export interface RawGalleryImageMeta {
  title: string;
  asset: string;
}

export interface RawGalleries {
  fields: any;
  entries: RawGallery[];
}
