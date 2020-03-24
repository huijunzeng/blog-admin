<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  // App.vue---根组件  所有页面都是在App.vue下进行切换的，components或者views文件夹下的带.vue后缀的文件都是子组件
  name: 'App',// 组件定义名
  /*components: {
    HelloWorld
  },*/

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
