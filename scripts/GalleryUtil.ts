import { Api } from './Api';
import { Gallery, GalleryImage } from './models/Gallery';
import { RawGalleries } from './models/RawGallery';

export class GalleryUtil {
  public static getGalleries = async (): Promise<Gallery[]> => {
    const raw = await Api.get<RawGalleries>('/api/collections/get/galleries');
    const galleries: Gallery[] = [];
    await raw.entries.forEach(async g => {
      const images: GalleryImage[] = [];

      await g.gallery.forEach(async img => {
        const thumb = await Api.post<string>(`/api/cockpit/image`, {
          src: img.meta.asset,
          m: 'bestFit',
          w: 200,
          h: 200
        });
        images.push({
          title: img.meta.title,
          asset: img.meta.title,
          thumbPath: thumb,
          fullSizePath: img.path
        });
      });

      galleries.push({
        title: g.title,
        title_en: g.title_en,
        title_fr: g.title_fr,
        slug: g.slug,
        images: images
      });
    });
    return galleries;
  };
}
