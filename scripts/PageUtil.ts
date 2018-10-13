export class PageUtil {
  static parsePages = (raw: any) => {
    const result: any[] = [];
    raw.forEach((page: any) => {
      result.push({
        slug: page.slug,
        path: '/' + page.slug,
        locale: 'nl',
        title: page.title,
        content: page.content
      });
      result.push({
        slug: page.slug,
        path: '/en/' + page.slug,
        locale: 'en',
        title: page.title_en || page.title,
        content: page.content_en || page.content
      });
      result.push({
        slug: page.slug,
        path: '/fr/' + page.slug,
        locale: 'fr',
        title: page.title_fr || page.title,
        content: page.content_fr || page.content
      });
    });
    return result;
  };
}
