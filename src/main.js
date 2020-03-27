import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'

// 阻止启动生产消息，常用作指令
Vue.config.productionTip = false

// 注册插件  这里项目ui使用element-ui插件  第一个是参数是要注册的插件名，第二个参数是配置项options
Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size
})

// 入口文件  初始化vue实例并使用需要的插件
new Vue({
  el: '#app', // 挂载根组件App.vue的id元素 app
  store, // 引入vuex状态管理
  router, // 引入路由
  render: h => h(App)
})
