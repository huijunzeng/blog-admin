import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 入口文件  初始化vue实例并使用需要的插件
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
