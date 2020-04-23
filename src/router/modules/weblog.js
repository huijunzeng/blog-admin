/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout' //整体页面布局

const weblogRouter = {
    path: '/weblog',
    component: Layout,
    redirect: '/weblog/article',
    name: 'weblog',
    meta: {
        title: '博客管理', //路由名
        icon: 'table' //对应的icon图标
    },
    //多级菜单的子路由
    children: [
        {
            path: 'article',
            name: 'article-manage',
            component: () => import('@/views/weblog/article/index'),
            meta: {
                title: '文章管理',
                icon: 'table'
            },
            children: [
                {
                    path: 'list',
                    name: 'article-list',
                    component: () => import('@/views/weblog/article/list'),
                    meta: {
                        title: '文章列表',
                        icon: 'table'
                    }
                },
                {
                    path: 'create',
                    name: 'article-create',
                    component: () => import('@/views/weblog/article/create'),
                    meta: {
                        title: '添加文章',
                        icon: 'table'
                    },
                    hidden: true
                },
                {
                    path: 'detail/:id',
                    name: 'article-detail',
                    component: () => import('@/views/weblog/article/detail'),
                    meta: {
                        title: '文章详情',
                        icon: 'table'
                    },
                    hidden: true
                },
                {
                    path: 'update/:id',
                    name: 'article-update',
                    component: () => import('@/views/weblog/article/update'),
                    meta: {
                        title: '修改文章',
                        icon: 'table'
                    },
                    hidden: true
                }
            ]
        },
        {
            path: 'comment',
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
