/** When your routing table is too long, you can split it into small modules**/

const systemRouter = {
    path: '/admin-user',
    component: () => import('@/views/admin-user'),
    name: 'system',
    meta: {
        title: '权限管理',
        icon: 'table'
    },
    children: [
        {
            path: 'user',
            name: 'user-manage',
            component: () => import('@/views/admin-user/user'),
            meta: {
                title: '用户管理',
                icon: 'table'
            }
        },
        {
            path: 'role',
            name: 'role-manage',
            component: () => import('@/views/admin-user/role'),
            meta: {
                title: '角色管理',
                icon: 'eye'
            }
        },
        {
            path: 'resource',
            name: 'resource-manage',
            component: () => import('@/views/admin-user/resource'),
            meta: {
                title: '菜单管理',
                icon: 'tree'
            }
        }
    ]
}

export default systemRouter
