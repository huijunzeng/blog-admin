<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        // <div>标签需要加上<router-view/>
        // App.vue---根组件  所有页面都是在App.vue下进行切换的，components或者views文件夹下的带.vue后缀的文件都是子组件
        name: 'App',// 组件定义名
    }
</script>

<style lang="scss">
    #app {
        height: 100%;
        > div {
            height: 100%;
        }
    }
</style>

