import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'

// 阻止启动生产消息，常用作指令
Vue.config.productionTip = false

// 全局组件的使用方式  这里项目ui使用element-ui组件
Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size
})

// 入口文件  初始化vue实例并使用需要的插件
new Vue({
  el: '#app', // 挂载根组件App.vue的id元素 app
  store,
  router,
  render: h => h(App)
})
