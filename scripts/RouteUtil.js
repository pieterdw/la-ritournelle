import axios from 'axios';
import { PageUtil } from './PageUtil';
export class RouteUtil {
}
RouteUtil.getRoutes = async () => {
    const result = await axios.get('https://admin.vakantiehuisantibes.com/api/collections/get/pages?token=ab5b0c4737b57b8d7bac392bb68912');
    const pages = PageUtil.parsePages(result.data.entries);
    return [
        {
            path: '/',
            component: 'src/containers/Home'
        },
        {
            path: '/about',
            component: 'src/containers/About'
        },
        ...pages.map(p => ({
            path: p.path,
            component: 'src/containers/Page',
            getData: () => ({ page: p })
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
