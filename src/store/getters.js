const getters = {
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
