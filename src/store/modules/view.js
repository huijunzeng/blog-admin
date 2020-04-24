// 页面设置
export default {
    namespaced: true, //开启命名空间
    state: {
        // 导航菜单折叠
        sidebarNavCollapse: false,
        // 面包屑导航列表
        crumbList: []
    },
    mutations: {
        // 导航菜单折叠切换
        SET_SIDEBARNAVCOLLAPSE(state) {
            state.sidebarNavCollapse = !state.sidebarNavCollapse
        },
        // 面包屑导航列表
        SET_CRUMBLIST(state, list) {
            state.crumbList = list
        }
    },
    actions: {
        // 导航菜单折叠切换
        toggleNavCollapse({ commit }) {
            commit('SET_SIDEBARNAVCOLLAPSE')
        },
        // 面包屑导航列表
        setCrumbList({ commit }, list) {
            commit('SET_CRUMBLIST', list)
        }
    }
}