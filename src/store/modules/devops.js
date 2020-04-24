// 服务治理模块
export default {
  namespaced: true, //开启命名空间
  state: {
    // nacos注册与配置中心
    nacosServer: 'http://129.211.34.120:8848/nacos/#/login',
    // swagger
    swaggerApi: 'http://129.211.34.120:9800/swagger-ui.html',
    // portainer
    portainerDashboard: 'http://129.211.34.120:9000/#/auth',
    // rabbitmq
    rabbitmqServer: 'http://129.211.34.120:15672/',
    // elk
    elkDashboard: 'http://129.211.34.120:5601/login',
    // skywalking
    skywalkingUI: 'http://129.211.34.120:8080/',
    // sentinel
    sentinelDashboard: 'http://129.211.34.120:8088',
    // xxl-job
    xxljobDashboard: 'http://129.211.34.120:9090/xxl-job-admin/'
  }
}
