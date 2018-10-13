import { Page, RawPage } from './models/Page';

export class PageUtil {
  static parsePages = (raw: RawPage[]): Page[] => {
    const result: Page[] = [];
    raw.forEach((page: any) => {
      result.push({
        slug: page.slug,
        path: page.slug === 'home' ? '/' : '/' + page.slug,
        locale: 'nl',
        title: page.title,
        intro: page.intro,
        content: page.content
      });
      result.push({
        slug: page.slug,
        path: page.slug === 'home' ? '/en' : '/en/' + page.slug,
        locale: 'en',
        title: page.title_en || page.title,
        intro: page.intro_en || page.intro,
        content: page.content_en || page.content
      });
      result.push({
        slug: page.slug,
        path: page.slug === 'home' ? '/fr' : '/fr/' + page.slug,
        locale: 'fr',
        title: page.title_fr || page.title,
        intro: page.intro_fr || page.intro,
        content: page.content_fr || page.content
      });
    });
    return result;
  };
}
