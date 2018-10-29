import { Api } from './Api';
import { BookingOptionsUtil } from './BookingOptionsUtil';
import { CalendarUtil } from './CalendarUtil';
import { GalleryUtil } from './GalleryUtil';
import { MenuUtil } from './MenuUtil';
import { RawPages } from './models/RawPages';
import { PageUtil } from './PageUtil';
import { VariousUtil } from './VariousUtil';

export class RouteUtil {
  static getRoutes = async () => {
    const rawPages = await Api.get<RawPages>('/api/collections/get/pages');
    const rawMenu = await Api.get('/api/singletons/get/menu_header');
    const rawVarious = await Api.get('/api/singletons/get/Various');
    const rawBookingOptions = await Api.get('/api/singletons/get/bookingoptions');
    const bookings = await CalendarUtil.getEvents();
    const galleries = await GalleryUtil.getGalleries();
    const menu = MenuUtil.parseMenu(rawPages, rawMenu);
    const pages = PageUtil.parsePages(rawPages.entries);
    const various = VariousUtil.parseVarious(rawVarious);
    const bookingOptions = BookingOptionsUtil.parseBookingOptions(rawBookingOptions);

    return [
      ...pages.map(p => {
        const result: any = {
          path: p.path,
          component: PageUtil.getPageComponent(p.slug),
          getData: () => ({
            page: p,
            menu: menu[p.locale],
            various: various[p.locale]
          })
        };
        if (p.slug === 'fotos') {
          const gal = galleries[p.locale];
          result.getData = () => ({
            page: p,
            galleries: gal,
            menu: menu[p.locale],
            various: various[p.locale]
          });
          result.children = gal.map(g => ({
            path: g.slug,
            component: result.component,
            getData: () => ({
              page: p,
              menu: menu[p.locale],
              various: various[p.locale],
              galleries: gal,
              gallerySlug: g.slug
            })
          }));
        } else if (p.slug === 'reserveren') {
          result.getData = () => ({
            page: p,
            bookings: bookings,
            bookingOptions: bookingOptions[p.locale],
            menu: menu[p.locale],
            various: various[p.locale]
          });
        }
        return result;
      }),
      //   {
      //     path: '/blog',
      //     component: 'src/containers/Blog',
      //     getData: () => ({
      //       posts
      //     }),
      //     children: posts.map(post => ({
      //       path: `/post/${post.id}`,
      //       component: 'src/containers/Post',
      //       getData: () => ({
      //         post
      //       })
      //     }))
      //   },
      {
        is404: true,
        component: 'src/containers/404'
      }
    ];
  };
}
