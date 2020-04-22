/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout' //整体页面布局

const systemRouter = {
    path: '/admin',
    component: Layout,
    redirect: '/admin/user',
    name: 'admin',
    meta: {
        title: '权限管理', //路由名
        icon: 'table' //对应的icon图标
    },
    //多级菜单的子路由
    children: [
        {
            path: '/user',
            name: 'user-manage',
            component: () => import('@/views/admin/user'),
            meta: {
                title: '用户管理',
                icon: 'table'
            }
        },
        {
            path: '/role',
            name: 'role-manage',
            component: () => import('@/views/admin/role'),
            meta: {
                title: '角色管理',
                icon: 'eye'
            }
        },
        {
            path: '/resource',
            name: 'resource-manage',
            component: () => import('@/views/admin/resource'),
            meta: {
                title: '资源管理',
                icon: 'tree'
            }
        }
    ]
}

export default systemRouter
