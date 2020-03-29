import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// 注册全局组件 第一个参数是自定义元素名称，也就是将来在别的组件中使用这个组件的标签名称；第二个参数是将要注册的Vue组件  需要在main.js引入
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
// 遍历/svg路径下的所有以.svg结束的文件，但不遍历文件的子目录
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)