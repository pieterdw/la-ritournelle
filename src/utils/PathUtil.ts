export class PathUtil {
  public static getPathInLocale = (locale: string, id: string, slug: string) => {
    if (id === 'homepage') {
      return locale === 'nl' ? '/' : '/' + locale;
    }
    return `/${locale}/${slug}`;
  };
}
