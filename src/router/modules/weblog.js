/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout' //整体页面布局

const weblogRouter = {
    path: '/weblog',
    component: Layout,
    redirect: '/weblog/article',
    name: 'weblog-manage',
    meta: {
        title: '博客管理', //路由名
        icon: 'table' //对应的icon图标
    },
    //多级菜单的子路由
    children: [
        {
            path: '/weblog/article',
            name: 'article-manage',
            component: () => import('@/views/weblog/article'),
            meta: {
                title: '文章管理',
                icon: 'table'
            },
            children: [
                {
                    path: '/weblog/article/list',
                    name: 'article-list',
                    component: () => import('@/views/weblog/article/list'),
                    meta: {
                        title: '文章列表',
                        icon: 'table'
                    }
                },
                {
                    path: '/weblog/article/create',
                    name: 'article-create',
                    component: () => import('@/views/weblog/article/create'),
                    meta: {
                        title: '添加文章',
                        icon: 'table'
                    },
                    hidden: true
                }
            ]
        },
        {
            path: '/weblog/comment',
            name: 'comment-manage',
            component: () => import('@/views/weblog/comment'),
            meta: {
                title: '评论管理',
                icon: 'eye'
            }
        }
    ]
}

export default weblogRouter
