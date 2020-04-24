import Vue from 'vue'
import App from '@/App'
import ElementUI from 'element-ui' //引入element-ui
import 'element-ui/lib/theme-chalk/index.css' //引入element-ui主题
import './styles/index.scss'
import NProgress from 'nprogress' // progress进度条
import router from '@/router/index'
import store from '@/store/index'
import '@/icons' //icon
import mavonEditor from 'mavon-editor' //markdown编辑器
import 'mavon-editor/dist/css/index.css'
require('@/mock/mock.js')

// 阻止启动生产消息，常用作指令
Vue.config.productionTip = false

// 注册插件  这里项目ui使用element-ui完整插件（包含多个组件，用Vue.use可以一次性全部注册，也可以用Vue.component一个一个地注册需要用到的组件）  第一个是参数是要注册的插件名，第二个参数是全局配置项options，该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index 堆叠顺序（默认值：2000）
Vue.use(ElementUI, {
    size: 'medium', // set element-ui default size
    zIndex: 3000 // set element-ui default zIndex
})
Vue.use(mavonEditor);

// vue路由的全局钩子函数,拦截路由，不管访问哪个路由都先走这里   这里主要用于加载动态路由（登录成功后路由到/路径的home组件之前时，请求后端查询用户权限的接口，然后通过addRoutes生成动态路由，也即home的左侧菜单栏）
// to即将要进入的目标 路由对象;（这个对象中包含name，params，meta等属性）
// from: 当前导航正要离开的路由对象；（这个对象中包含name，params，meta等属性）
// next: Function: 确保要调用 next 方法，否则钩子就不会被resolved。这个当中还可以传一些参数，具体可以看官方文档
//const test = ((to, from, next) => {
router.beforeEach((to, from, next) => {
    to.matched.forEach(record => console.log(record.name))
    NProgress.start() //显示进度条
    if (store.state.user.token) {// 有token
        if (store.state.permission.permissionList) {// 有生成动态路由
            if (to.path !== '/login') {
                next()
                NProgress.done() //完成进度条
            } else {
                // fullPath匹配路由，path匹配路径
                next(from.fullPath)
                NProgress.done() //完成进度条
            }
        } else {
            // 没有生成动态路由则根据username重新获取路由集合
            store.dispatch('user/getUserInfo')
            const username = store.state.user.username
            store.dispatch('permission/FETCH_PERMISSION', username).then(() => {
                next({path: to.path})
                NProgress.done() //完成进度条
            })
        }
    } else {// 没有token
        // to.matched包含所有路由信息的数组  如果路由的mate中有requiresAuth(需要权限的) 那么就返回true   some方法：有一个满足就返回true
        if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {// 不需要权限
            next()
            NProgress.done() //完成进度条
        } else {// 需要权限
            next({ path: '/login' })
            NProgress.done() //完成进度条
        }
    }
})

router.afterEach((to) => {
    // 添加面包屑
    const routerList = to.matched
    store.dispatch('view/setCrumbList', routerList)
    // 当前导航菜单名称
    store.dispatch('permission/setCurrentMenu', to.name)
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
