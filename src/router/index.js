import Vue from 'vue'
import VueRouter from 'vue-router'
import devopsRouter from './modules/devops'
import adminUserRouter from './modules/admin'
import weblogRouter from './modules/weblog'

import Layout from '@/layout' //整体页面布局
Vue.use(VueRouter)

// 基础路由集合（不需要权限） 定义请求路径跳转到指定的组件
export const baseRoutes = [
    {
        path: '',
        component: Layout,
        name: 'container',
        redirect: 'home',
        meta: {
            requiresAuth: true,
            title: '首页'
        },
        children: [
            {
                id: 1,
                path: 'home',
                component: () => import('@/views/home/index'), //配置路由懒加载，优化首屏加载缓慢
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'tree'
                }
            }
        ]
    },
    {
        path: '/notFound',
        name: 'NotFound',
        component: () => import('@/views/error-page/4012'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import('@/views/login/index')
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    }
]


/* 需要权限判断的路由 */
export const dynamicRoutes = [
    devopsRouter,
    adminUserRouter,
    weblogRouter
    /*{
        path: '/order',
        component: Order,
        name: 'order-manage',
        meta: {
            name: '订单管理',
            icon: 'example'
        },
        children: [
            {
                path: 'list',
                name: 'order-list',
                component: OrderList,
                meta: {
                    name: '订单列表',
                    icon: 'table'
                }
            },
            {
                path: 'product',
                name: 'product-manage',
                component: ProductManage,
                meta: {
                    name: '生产管理',
                    icon: 'user'
                },
                children: [
                    {
                        path: 'list',
                        name: 'product-list',
                        component: ProductionList,
                        meta: {
                            name: '生产列表',
                            icon: 'table'
                        }
                    },
                    {
                        path: 'review',
                        name: 'review-manage',
                        component: ReviewManage,
                        meta: {
                            name: '审核管理',
                            icon: 'eye'
                        }
                    }
                ]
            },
            {
                path: 'returnGoods',
                name: 'return-goods',
                component: ReturnGoods,
                meta: {
                    name: '退货管理',
                    icon: 'nested'
                }
            }
        ]
    },
    {
        path: '/goods',
        component: Goods,
        name: 'goods',
        meta: {
            name: '产品管理',
            icon: 'user'
        },
        children: [
            {
                path: 'list',
                name: 'goods-list',
                component: GoodsList,
                meta: {
                    name: '产品列表',
                    icon: 'table'
                }
            },
            {
                path: 'classify',
                name: 'goods-classify',
                component: GoodsClassify,
                meta: {
                    name: '产品分类',
                    icon: 'tree'
                }
            }
        ]
    },
    {
        path: '/permission',
        component: Permission,
        name: 'permission',
        meta: {
            name: '权限管理',
            icon: 'table'
        },
        children: [
            {
                path: 'user',
                name: 'user-manage',
                component: UserManage,
                meta: {
                    name: '用户管理',
                    icon: 'table'
                }
            },
            {
                path: 'role',
                name: 'role-manage',
                component: RoleManage,
                meta: {
                    name: '角色管理',
                    icon: 'eye'
                }
            },
            {
                path: 'menu',
                name: 'menu-manage',
                component: MenuManage,
                meta: {
                    name: '菜单管理',
                    icon: 'tree'
                }
            }
        ]
    }*/
]

// 创建路由
const createRouter = () => new VueRouter({
    // 默认hash模式请求地址栏URL中有#符号，而另外一种history模式没有#符号  二者区别不大，在于浏览器自身的特性
    mode: 'hash',
    // process.env 属性返回包含用户环境的对象(process是一个全局变量)
    base: process.env.BASE_URL,
    routes: baseRoutes
})

const router = createRouter()

// 重置路由  用于用户退出登录或者切换用户登录时
export function resetRouter() {
    const newRouter = createRouter()
    // router两个方法：match(负责route匹配), addRoutes（动态添加路由）
    router.matcher = newRouter.matcher // reset router
}

export default router
