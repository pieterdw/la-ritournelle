import { RawPages } from './models/RawPages';

export class MenuUtil {
  public static parseMenu = (rawPages: RawPages, rawMenu): Menu => {
    const pages = rawMenu.items.map(item => {
      return rawPages.entries.find(page => page._id === item._id);
    });
    return {
      nl: pages.map(page => ({ label: page.title, url: '/nl/' + page.slug })),
      en: pages.map(page => ({ label: page.title_en || page.title, url: '/en/' + page.slug })),
      fr: pages.map(page => ({ label: page.title_fr || page.title, url: '/fr/' + page.slug }))
    };
  };
}

export interface MenuItem {
  label: string;
  url: string;
}

export interface Menu {
  nl: MenuItem[];
  en: MenuItem[];
  fr: MenuItem[];
}
