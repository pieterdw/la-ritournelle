import { Api } from './Api';
import { MenuUtil } from './MenuUtil';
import { RawPages } from './models/RawPages';
import { PageUtil } from './PageUtil';
import { VariousUtil } from './VariousUtil';

export class RouteUtil {
  static getRoutes = async () => {
    const rawPages = await Api.get<RawPages>('/api/collections/get/pages');
    const rawMenu = await Api.get('/api/singletons/get/menu_header');
    const rawVarious = await Api.get('/api/singletons/get/Various');
    const menu = MenuUtil.parseMenu(rawPages, rawMenu);
    const pages = PageUtil.parsePages(rawPages.entries);
    const various = VariousUtil.parseVarious(rawVarious);
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
        getData: () => ({
          page: p,
          menu: menu[p.locale],
          various: various[p.locale]
        })
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
