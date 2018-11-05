import { KeyValue } from './models/KeyValue';
import { MenuItem } from './models/MenuItem';
import { Page } from './models/Page';
import { PageUtil } from './PageUtil';

export class MenuUtil {
  public static parseMenu = (
    rawPages: Array<Array<KeyValue<Page>>>,
    rawMenu,
    languages: string[]
  ): KeyValue<MenuItem>[] => {
    return languages.map(locale => ({
      key: locale,
      value: rawMenu[MenuUtil.getItemsKey(locale)].map(MenuUtil.parseMenuItem(locale, rawPages))
    }));
  };

  private static getItemsKey = (locale: string): string => {
    if (locale === 'nl') {
      return 'items';
    }
    return 'items_' + locale;
  };

  private static parseMenuItem = (locale: string, rawPages: Array<Array<KeyValue<Page>>>) => item => {
    const page = MenuUtil.findPage(item.value.id, locale, rawPages);
    return {
      id: item.value.id,
      label: item.value.label || page.title,
      path: PageUtil.getPath(locale, page.slug)
    };
  };

  private static findPage = (id: string, locale: string, rawPages: Array<Array<KeyValue<Page>>>): Page => {
    for (let i = 0; i < rawPages.length; i++) {
      const rawPage = rawPages[i];
      for (let j = 0; j < rawPage.length; j++) {
        const page = rawPage[j];
        if (page.key === locale && page.value.id === id) {
          return page.value;
        }
      }
    }
  };
}
