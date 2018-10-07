export class PageUtil {
  static parsePages = raw => {
    const result = [];
    raw.forEach(page => {
      result.push({
        path: '/' + page.slug,
        locale: 'nl',
        title: page.title,
        content: page.content
      });
      result.push({
        path: '/en/' + page.slug,
        locale: 'en',
        title: page.title_en || page.title,
        content: page.content_en || page.content
      });
      result.push({
        path: '/fr/' + page.slug,
        locale: 'fr',
        title: page.title_fr || page.title,
        content: page.content_fr || page.content
      });
    });
    return result;
  };
}
