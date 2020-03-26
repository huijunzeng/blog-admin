import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from './store'
import { getToken } from './auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // 请求超时时间设置  这里设置5秒
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前可以做一些处理
    // 往请求头添加token
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // 请求失败的处理
    console.log(error) // for debug
    // Promise是一个类，有3个状态分别是：等待态（默认） 成功态 失败态  成功就执行resolved函数，失败就执行reject函数
    return Promise.reject(error)
  }
)

// 响应拦截器  在响应之前可以做一些处理
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // 调取store里的user.js的resetToken方法
          /*store.dispatch('user/resetToken').then(() => {
            location.reload()
          })*/
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 响应失败的处理
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000 // 提示持续时间
    })
    return Promise.reject(error)
  }
)

export default service
