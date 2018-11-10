import { Api } from './Api';
import { GalleriesByLocale, Gallery, GalleryImage } from './models/Gallery';
import { RawGalleries } from './models/RawGallery';

export class GalleryUtil {
  public static getGalleries = async (): Promise<GalleriesByLocale> => {
    const raw = await Api.get<RawGalleries>('/api/collections/get/galleries');
    const nl: Gallery[] = [];
    const en: Gallery[] = [];
    const fr: Gallery[] = [];

    for (let i = 0; i < raw.entries.length; i++) {
      const g = raw.entries[i];
      const images: GalleryImage[] = [];

      for (let j = 0; j < g.gallery.length; j++) {
        const img = g.gallery[j];
        const thumb = await Api.post<string>(`/api/cockpit/image`, {
          src: img.path,
          m: 'thumbnail',
          w: 360,
          h: 200
        });
        images.push({
          title: img.meta.title,
          thumbPath: thumb,
          fullSizePath: Api.cmsBasePath + '/' + img.path
        });
      }

      nl.push({
        title: g.title,
        slug: g.slug,
        images: images
      });
      en.push({
        title: g.title_en || g.title,
        slug: g.slug,
        images: images
      });
      fr.push({
        title: g.title_fr || g.title,
        slug: g.slug,
        images: images
      });
    }
    return {
      nl,
      en,
      fr
    };
  };
}
