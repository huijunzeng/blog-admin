import Vue from 'vue'
import App from '@/App'
import ElementUI from 'element-ui' //引入element-ui
import 'element-ui/lib/theme-chalk/index.css' //引入element-ui主题
import './styles/index.scss'
import NProgress from 'nprogress' // progress进度条
import router from '@/router/index'
import store from '@/store/index'

import '@/icons' //icon
require('@/mock/mock.js')

// 阻止启动生产消息，常用作指令
Vue.config.productionTip = false

// 注册插件  这里项目ui使用element-ui完整插件（包含多个组件，用Vue.use可以一次性全部注册，也可以用Vue.component一个一个地注册需要用到的组件）  第一个是参数是要注册的插件名，第二个参数是全局配置项options，该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）
Vue.use(ElementUI, {
    size: 'medium', // set element-ui default size
    zIndex: 3000 // set element-ui default zIndex
})

// vue路由的全局钩子函数   这里主要用于加载动态路由（登录成功后路由到/路径的home组件之前时，请求后端查询用户权限的接口，然后通过addRoutes生成动态路由，也即home的左侧菜单栏）
router.beforeEach((to, from, next) => {
    console.log("start permission")
    console.log("to.matched：" + to.matched)
    NProgress.start() //显示进度条
    if (!store.state.UserToken) {// 没有token
        // to.matched包含所有路由信息的数组  如果路由的mate中有requiresAuth(需要权限的) 那么就返回true   some方法：有一个满足就返回true
        if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
            next() //进入下一步
        } else {
            // 需要权限的，重定向到登录页面
            next({ path: '/login' })
            NProgress.done() //完成进度条
        }
    } else {
        console.log("store.state.permission.permissionList：" + store.state.permission.permissionList)
        if (!store.state.permission.permissionList) {// 没有路由集合时，重新获取
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({ path: to.path })
                NProgress.done() //完成进度条
            })
        } else {
            if (to.path !== '/login') {
                next()
                NProgress.done() //完成进度条
            } else {
                console.log("from.fullPath：" + from.fullPath)
                next(from.fullPath)
                NProgress.done() //完成进度条
            }
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done() //完成进度条
})


// 入口文件  初始化vue实例并使用需要的插件
new Vue({
    el: '#app', // 挂载根组件App.vue的id元素 app
    store, // 引入vuex状态管理
    router, // 引入路由
    render: h => h(App)
})
