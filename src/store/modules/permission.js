import { getResourceByUsername } from '@/api/admin/resource'
import router, { baseRoutes, dynamicRoutes } from '@/router/index'

// 权限路由
export default {
    namespaced: true, //开启命名空间
    state: {
        permissionList: null /** 所有路由 */,
        sidebarMenu: [] /** 导航菜单 */,
        currentMenu: '' /** 当前active导航菜单 */,
        control_list: [] /** 完整的权限列表 */
    },
    getters: {},
    mutations: {
        SET_PERMISSION(state, routes) {
            state.permissionList = routes
        },
        CLEAR_PERMISSION(state) {
            state.permissionList = null
        },
        SET_MENU(state, menu) {
            state.sidebarMenu = menu
        },
        CLEAR_MENU(state) {
            state.sidebarMenu = []
        },
        SET_CURRENT_MENU(state, currentMenu) {
            state.currentMenu = currentMenu
        },
        SET_CONTROL_LIST(state, list) {
            state.control_list = list
        }
    },
    actions: {
        async FETCH_PERMISSION({ commit }, username) {
            console.log("username: " , username);
            /*let response = await getResourceByUsername(username)
            console.log("permissionList: " , response.data);*/
            //let routes = recursionRouter(JSON.parse(response.data), dynamicRoutes)
            let routes = baseRoutes.concat(dynamicRoutes)
            console.log("dynamicRoutes: " , dynamicRoutes);
            console.log("routes: " , routes);
            //let MainContainer = dynamicRoutes.find(v => v.path === '')
            let MainContainer = baseRoutes.find(v => v.path === '')
            console.log("MainContainer:" , MainContainer)
            console.log("MainContainer.name:", MainContainer.name)
            let children = MainContainer.children
            console.log("children: " , children);
            commit('SET_CONTROL_LIST', [...children, ...dynamicRoutes])
            //children.push(...routes)
            children.push(...dynamicRoutes)
            console.log("after children: " , children);
            commit('SET_MENU', children)
            let initialRoutes = router.options.routes
            //router.addRoutes(dynamicRoutes)
            router.addRoutes(children)
            //commit('SET_PERMISSION', [...initialRoutes, ...dynamicRoutes])
            commit('SET_PERMISSION', children)
        },
        // 当前导航菜单名称
        setCurrentMenu({ commit }, currentMenu) {
            commit('SET_CURRENT_MENU', currentMenu)
        }
    }
}

/**
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
export function recursionRouter(userRouter = [], allRouter = []) {
    for (let i = 0; i < userRouter.length; i++) {
        console.log("userRouter: " + userRouter[i].name)
    }
    for (let i = 0; i < allRouter.length; i++) {
        console.log("allRouter: " + allRouter[i].name)
    }
    console.log("8888888888888:" + userRouter.includes('admin'))
    var realRoutes = allRouter
        .filter(item => userRouter.includes(item.name))
        .map(item => ({
            ...item,
            children: item.children
                ? recursionRouter(userRouter, item.children)
                : null
        }))
    console.log("realRoutes:" + realRoutes)
    return realRoutes
}

/**
 *
 * @param {Array} routes 用户过滤后的路由
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
export function setDefaultRoute(routes) {
    routes.forEach((v, i) => {
        if (v.children && v.children.length > 0) {
            v.redirect = { name: v.children[0].name }
            setDefaultRoute(v.children)
        }
    })
}

