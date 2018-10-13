import { Api } from './Api';
import { MenuUtil } from './MenuUtil';
import { PageUtil } from './PageUtil';

export class RouteUtil {
  static getRoutes = async () => {
    const rawPages = await Api.get<any>('/api/collections/get/pages');
    const rawMenu = await Api.get('/api/singletons/get/menu_header');
    const menu = MenuUtil.parseMenu(rawPages, rawMenu);
    const pages = PageUtil.parsePages(rawPages.entries);
    return [
      // {
      //   path: '/',
      //   component: 'src/containers/Home'
      // },
      // {
      //   path: '/about',
      //   component: 'src/containers/About'
      // },
      ...pages.map(p => ({
        path: p.path,
        component: 'src/containers/Page',
        getData: () => ({ page: p, menu: menu[p.locale] })
      })),
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
