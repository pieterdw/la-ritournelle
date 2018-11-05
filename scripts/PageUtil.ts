import Axios from 'axios';
import { Api } from './Api';
import { CalendarUtil } from './CalendarUtil';
import { GalleryUtil } from './GalleryUtil';
import { MenuUtil } from './MenuUtil';
import { KeyValue } from './models/KeyValue';
import { MenuItem } from './models/MenuItem';
import { Page } from './models/Page';

export class PageUtil {
  private static _languages = ['nl', 'en', 'fr'];

  public static getPages = async (): Promise<Route[]> => {
    const data = await PageUtil.fetchData();
    const text = PageUtil.splitObjectInLanguages(data.find(x => x.id === 'text'));
    const pages: Array<Array<KeyValue<Page>>> = data
      .filter(x => x.id.endsWith('page'))
      .map(x => PageUtil.splitObjectInLanguages(x));
    const rawMenu = data.find(x => x.id === 'menu');
    const menu = MenuUtil.parseMenu(pages, rawMenu, PageUtil._languages);

    return await PageUtil.createRoutes(pages, text, menu);
  };

  private static fetchData = async () => {
    let singletons = await Api.get<string[]>('/api/singletons/listSingletons');
    singletons = singletons.filter(x => ['bookingoptions', 'menu_header', 'Various'].indexOf(x) === -1);
    const all = await Axios.all(singletons.map(sin => Api.get<any>('/api/singletons/get/' + sin)));
    const raw = all.map((data, i) => {
      const { _mby, _by, ...rest } = data;
      return {
        id: singletons[i],
        ...rest
      };
    });
    return raw;
  };

  private static splitObjectInLanguages = (rawObj: object): KeyValue<any>[] => {
    const obj: KeyValue<any>[] = [];
    for (var prop in rawObj) {
      if (rawObj.hasOwnProperty(prop)) {
        obj.push({ key: prop, value: rawObj[prop] });
      }
    }

    const nl = obj.filter(x => x.key.indexOf('_') === -1);

    let result: KeyValue<any>[] = [];
    result.push({ key: 'nl', value: PageUtil.keyValueToObject(nl) });

    result = result.concat(
      PageUtil._languages.filter(locale => locale !== 'nl').map(lang => {
        const values = nl.map(nl => {
          const found = obj.find(x => x.key === nl.key + '_' + lang);
          return {
            key: nl.key,
            value: found && found.value ? found.value : nl.value
          };
        });
        return {
          key: lang,
          value: PageUtil.keyValueToObject(values)
        };
      })
    );
    return result;
  };

  private static keyValueToObject = (input: KeyValue<any>[]) => {
    const result: any = {};
    input.forEach(x => {
      result[x.key] = x.value;
    });
    return result;
  };

  private static createRoutes = async (
    raw: Array<Array<KeyValue<Page>>>,
    text: KeyValue<any>[],
    menu: KeyValue<MenuItem>[]
  ): Promise<Route[]> => {
    const result: Route[] = [];
    raw.forEach(async rawPage => {
      rawPage.forEach(async page => {
        result.push(await PageUtil.createRoute(page, text, menu));
      });
    });
    result.push({
      is404: true,
      component: 'src/containers/404'
    } as any);
    return result;
  };

  private static createRoute = async (page: KeyValue<Page>, texts: KeyValue<any>[], menus: KeyValue<MenuItem>[]) => {
    const component = PageUtil.getPageComponent(page.value.id);
    const path = '/' + page.key + (page.value.slug ? '/' + page.value.slug : '');
    const text = texts.find(x => x.key === page.key).value;
    const menu = menus.find(x => x.key === page.key).value;

    let children = undefined;
    let data: any = {
      locale: page.key,
      path: path,
      text: text,
      menu: menu,
      ...page.value
    };

    if (page.value.id === 'gallerypage') {
      const galleriesAll = await GalleryUtil.getGalleries();
      const galleries = galleriesAll[page.key];
      data = {
        ...data,
        galleries: galleries
      };
      children = galleries.map(g => ({
        path: g.slug,
        component: component,
        getData: () => ({
          ...data,
          path: data.path + '/' + g.slug,
          gallerySlug: g.slug
        })
      }));
    } else if (page.value.id === 'bookingpage') {
      const bookings = await CalendarUtil.getEvents();
      data = {
        ...data,
        bookings: bookings
      };
    }

    const item: Route = {
      path: path,
      component: component,
      children: children,
      getData: () => data
    };
    return item;
  };

  private static getPageComponent = (id: string): string => {
    switch (id) {
      case 'homepage':
        return 'src/containers/HomePage';
      case 'gallerypage':
        return 'src/containers/GalleryPage';
      case 'bookingpage':
        return 'src/containers/BookingPage';
      case 'contactpage':
        return 'src/containers/ContactPage';
      default:
        return 'src/containers/Page';
    }
  };
}

interface Route {
  path: string;
  component: string;
  getData: () => Page;
  children?: Route[];
}
