import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, checkToken } from '@/api/auth/user'

// 用户模块
export default {
    namespaced: true, //开启命名空间
    state: {
        token: getToken(), //为了避免用户刷新页面vuex数据丢失，需要把token保存到storage，每次拿数据时从storage获取
        username: '',
        avatar: '', // 头像
        roles: [] // 用户角色
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        // 用户登录，只验证用户是否登录成功，成功则只保存token到storage，再在跳转路由时（首次登录成功后跳转即获取用户信息）判断是否需要调取用户信息接口获取用户信息（解决刷新页面vuex数据丢，在之后碰到用户刷新页面时，就再次发送token到后端获取用户信息）
        userLogin({ commit }, loginForm) {
            return new Promise((resolve, reject) => {
                const { username, password } = loginForm
                login({ username: username.trim(), password: password }).then(response => {
                    const data = response.data
                    commit('SET_TOKEN', data.access_token)
                    setToken(data.access_token)
                    resolve()
                }).catch(error => {
                    console.error(error)
                    reject(error)
                })
            })
            /*console.log("response.data: " + response.data)
            let data = response.data
            // 将token保存到storage
            let token = JSON.parse(data).access_token
            console.log("token: " + token)
            this.$store.dispatch('user/setToken', token)
            setToken(token)
            // 登录成功后，路由到首页
            //commit('SET_AVATAR', permissionList.avatar)
            //commit('SET_ACCOUNT', permissionList.name)
            this.$router.replace('/')*/
        },

        // 验证token并解析获取用户基本信息
         getUserInfo({ commit, state }) {
             return new Promise((resolve, reject) => {
                 checkToken(state.token).then(response => {
                     const data = response.data
                     if (!data) {
                         reject('Verification failed, please Login again.')
                     } else if (!data.active) {
                         reject('Token failure, please Login again.')
                     }
                     const { user_name, roles } = data
                     if (!roles || roles.length <= 0) {
                       reject('getInfo: roles must be a non-null array!')
                     }
                     commit('SET_ROLES', roles)
                     commit('SET_USERNAME', user_name)
                     commit('SET_AVATAR', '')
                     resolve()
                 }).catch(error => {
                     reject(error)
                 })
             })
         },

         // 用户退出登录
         logout({ commit, state }) {
             return new Promise((resolve, reject) => {
                 console.log('token8888；', state.token)
                 logout(state.token).then(() => {
                     console.log('logout 111；')
                     commit('SET_TOKEN', '')
                     commit('SET_ROLES', [])
                     removeToken()
                     //resetRouter()
                     resolve()
                 }).catch(error => {
                     reject(error)
                 })
             })
         },

         // remove token
         resetToken({ commit }) {
             return new Promise(resolve => {
                 commit('SET_TOKEN', '')
                 commit('SET_ROLES', [])
                 removeToken()
                 resolve()
             })
         },

         // dynamically modify permissions
         /*changeRoles({ commit, dispatch }, role) {
             return new Promise(async resolve => {
                 const token = role + '-token'

                 commit('SET_TOKEN', token)
                 setToken(token)

                 const { roles } = await dispatch('getInfo')

                 resetRouter()

                 // generate accessible routes map based on roles
                 const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

                 // dynamically add accessible routes
                 router.addRoutes(accessRoutes)

                 // reset visited views and cached views
                 dispatch('tagsView/delAllViews', null, { root: true })

                 resolve()
             })
         }*/
    }
}
