import Vue from 'vue'
import VueRouter from 'vue-router'
import devopsRouter from './modules/devops'

Vue.use(VueRouter)

// 路由集合 定义请求路径跳转到指定的组件
const routes = [
    devopsRouter,
    {
        path: '/login',
        component: () => import('@/views/login/index')
    },
]

// 创建路由
const router = () => new VueRouter({
    // 默认hash模式请求地址栏URL中有#符号，而另外一种history模式没有#符号  二者区别不大，在于浏览器自身的特性
    mode: 'hash',
    // process.env 属性返回包含用户环境的对象(process是一个全局变量)
    base: process.env.BASE_URL,
    routes: routes
})

export default router
