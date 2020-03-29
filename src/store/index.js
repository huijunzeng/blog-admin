import Vue from 'vue'
import Vuex from 'vuex'

// vuex全局状态管理  可以利用其store对象存储一些全局变量
Vue.use(Vuex)

// 创建全局变量
const store = new Vuex.Store({
    /*Vuex状态管理核心
        state里面就是存放项目中需要多组件共享的状态,可以理解为一个方法或变量数组，类似于Vue的data属性
        mutations就是存放更改state里状态的方法
        getters就是从state中派生出状态，比如将state中的某个状态进行过滤然后获取新的状态。
        actions就是mutation的加强版，它可以通过commit mutations中的方法来改变状态，最重要的是它可以进行异步操作。
        actions官方解释：
            可执行异步操作，而mutation只能执行同步操作
            不是突变直接操作state值，而是commit mutation之后由mutation操作state
            可以理解为如果业务中存在异步操作可用action，操作state唯一的途径时mutation；actions并不一定要, 但是mutation是必须要的, state的值, 只能通过mutation来编辑
            比如mutations有一个setValue方法，那么可以通过this.$store.commit('setValue', value);
        modules顾名思义，就是当用这个容器来装这些状态还是显得混乱的时候，我们就可以把容器分成几块，把状态和管理规则分类来装。这和我们创建js模块是一个目的，让代码结构更清晰。

    state: {
        //这里放全局参数
    },

    mutations: {
        //这里是set方法
    },

    getters: {
       //这里是get方法
    },

    actions: {
        //这个部分我暂时用不上
    },

    modules: {
        //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
    }
     */
})

export default store
