<template>
    <div class="main-container">
        <TopAside/>
        <Content/>
    </div>
</template>

<script>
import TopAside from './top-aside' //头部用户信息 登出组件
import Content from './content' //中间内容组件
import { mapGetters } from 'vuex'

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['sidebarNavCollapse'])
    },
    components: {
        TopAside,
        Content
    }
}
</script>
