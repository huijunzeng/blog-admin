/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout' //整体页面布局

const weblogRouter = {
    path: '/weblog-manage',
    component: Layout,
    redirect: '/weblog-manage/article',
    name: 'weblog-manage',
    meta: {
        title: '博客管理', //路由名
        icon: 'table' //对应的icon图标
    },
    //多级菜单的子路由
    children: [
        {
            path: 'article',
            name: 'article-manage',
            component: () => import('@/views/admin/user'),
            meta: {
                title: '文章管理',
                icon: 'table'
            }
        },
        {
            path: 'comment',
            name: 'comment-manage',
            component: () => import('@/views/admin/role'),
            meta: {
                title: '评论管理',
                icon: 'eye'
            }
        }
    ]
}

export default weblogRouter
