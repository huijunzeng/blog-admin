import Vue from 'vue'
import VueRouter from 'vue-router'

import ErrorPage401 from '@/views/error-page/4012'

Vue.use(VueRouter)

// 路由集合 定义请求路径跳转到指定的组件
const routes = [
    {
        path: '/401',
        name: 'errPage',
        component: ErrorPage401
    },
    {
        path: '/login',
        component: () => import('@/views/error-page/4012')
    }
]

// 创建路由
const router = new VueRouter({
    // 默认hash模式请求地址栏URL中有#符号，而另外一种history模式没有#符号  二者区别不大，在于浏览器自身的特性
    mode: 'hash',
    // process.env 属性返回包含用户环境的对象(process是一个全局变量)
    base: process.env.BASE_URL,
    routes
})

export default router
