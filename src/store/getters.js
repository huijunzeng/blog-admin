// 统一state，通过import { mapGetters } from 'vuex'，然后在vue组件的computed属性中使用...mapGetters(['state名'])获取值
// 假如不单独新建getter.js统一state，且所定义的state所在文件的路径与index.js不同级的情况下（同级则不需要传'modules文件名'参数），则通过import { mapState } from 'vuex'，
// 然后在vue组件的computed属性中使用...mapGetters('modules文件名', ['state名'])或者或者...mapState({变量名: state => state.modules文件名.state名}) 获取值
const getters = {
  permissionList: state => state.permission.permissionList,
  sidebarMenu: state => state.permission.sidebarMenu,
  currentMenu: state => state.permission.currentMenu,
  control_list: state => state.permission.control_list,
  token: state => state.user.token,
  username: state => state.user.username,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  sidebarNavCollapse: state => state.view.sidebarNavCollapse,
  crumbList: state => state.view.crumbList,
  nacosServer: state => state.devops.nacosServer,
  swaggerApi: state => state.devops.swaggerApi,
  portainerDashboard: state => state.devops.portainerDashboard,
  rabbitmqServer: state => state.devops.rabbitmqServer,
  elkDashboard: state => state.devops.elkDashboard,
  skywalkingUI: state => state.devops.skywalkingUI,
  sentinelDashboard: state => state.devops.sentinelDashboard,
  xxljobDashboard: state => state.devops.xxljobDashboard
}

export default getters
