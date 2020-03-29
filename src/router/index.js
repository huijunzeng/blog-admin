import Vue from 'vue'
import VueRouter from 'vue-router'
import devopsRouter from './modules/devops'

import Layout from '@/layout'
Vue.use(VueRouter)

// 路由集合 定义请求路径跳转到指定的组件
export const baseRoutes = [
    {
        path: '/',
        component: Layout,
        name: 'container',
        redirect: '/home',
        meta: {
            requiresAuth: true,
            title: '首页'
        },
        children: [
            {
                id: 1,
                path: '/home',
                component: () => import('@/views/home/index'),
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
        component: () => import('@/views/error-page/4012')
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
    devopsRouter
]

// 创建路由
const router = new VueRouter({
    // 默认hash模式请求地址栏URL中有#符号，而另外一种history模式没有#符号  二者区别不大，在于浏览器自身的特性
    mode: 'hash',
    // process.env 属性返回包含用户环境的对象(process是一个全局变量)
    base: process.env.BASE_URL,
    routes: baseRoutes
})

export default router
