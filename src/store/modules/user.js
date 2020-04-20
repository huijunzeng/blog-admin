import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getUserInfo } from '@/api/auth/user'
import router from '@/router'

const state = {
    token: getToken(),
    username: '',
    avatar: '', // 头像
    roles: [] // 用户角色
}

const mutations = {
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
}

const actions = {
    // user login
    login({ commit }, loginForm) {
        return new Promise((resolve, reject) => {
            const { username, password } = loginForm
            login({ username: username.trim(), password: password }).then(response => {
                console.log("data: " + response.data);
                const data = JSON.parse(response.data)
                commit('SET_TOKEN', data.access_token)
                commit('SET_USERNAME', data.username)
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

    // get user info
   /* getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { name, description } = data

                // roles must be a non-empty array
                // if (!roleIds || roleIds.length <= 0) {
                //   reject('getInfo: roles must be a non-null array!')
                // }

                commit('SET_ROLES', ['admin'])
                commit('SET_NAME', name)
                commit('SET_AVATAR', 'https://avatars3.githubusercontent.com/u/3946731?s=460&v=4')
                commit('SET_INTRODUCTION', description)
                data.roles = ['admin']
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()
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
    changeRoles({ commit, dispatch }, role) {
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

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
