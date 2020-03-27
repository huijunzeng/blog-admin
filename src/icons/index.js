import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// 注册全局组件 第一个参数是自定义元素名称，也就是将来在别的组件中使用这个组件的标签名称；第二个参数是将要注册的Vue组件
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
