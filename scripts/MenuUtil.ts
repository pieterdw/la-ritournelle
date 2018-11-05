import { KeyValue } from './models/KeyValue';
import { MenuItem } from './models/MenuItem';
import { Page } from './models/Page';

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
      path: '/'
    };
  };

  private static findPage = (id: string, locale: string, rawPages: Array<Array<KeyValue<Page>>>): Page => {
    let result: Page = null;
    rawPages.forEach(rawPage => {
      rawPage.forEach(page => {
        if (page.key === locale && page.value.id === id) {
          result = page.value;
        }
      });
    });
    return result;
  };
}
