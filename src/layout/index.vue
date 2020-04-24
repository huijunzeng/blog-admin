<template>
    <div :class="{navCollapsed:sidebarNavCollapse}">
        <sidebarNav  class="sidebar"/>
        <mainContent/>
    </div>
</template>

<script>
    import sidebarNav from './component/sidebar-nav' //左侧菜单栏组件
    import mainContent from './component/main-content/index' //主内容组件
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {}
        },
        computed: {
            ...mapGetters(['sidebarNavCollapse'])
        },
        components: {
            sidebarNav,
            mainContent
        }
    }
</script>

<style lang="scss" scoped>

</style>
