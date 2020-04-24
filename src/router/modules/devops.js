/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout' //整体页面布局

const devopsRouter = {
    path: '/devops',
    component: Layout,
    redirect: '/devops/register',
    name: 'Devops',
    meta: {
        title: '服务治理',
        icon: 'table'
    },
    children: [
        {
            path: '/devops/nacos',
            name: 'Register',
            component: () => import('@/views/devops/nacos'),
            meta: {
                title: '注册与配置中心',
                icon: 'link'
            }
        },
        {
            path: '/devops/swagger',
            name: 'Swagger',
            component: () => import('@/views/devops/swagger'),
            meta: {
                title: 'API接口文档',
                icon: 'link'
            }
        },
        {
            path: '/devops/portainer',
            name: 'Portainer',
            component: () => import('@/views/devops/portainer'),
            meta: {
                title: '容器管理',
                icon: 'link'
            }
        },
        {
            path: '/devops/rabbitmq',
            name: 'RabbitMQ',
            component: () => import('@/views/devops/rabbitmq'),
            meta: {
                title: '消息队列',
                icon: 'link'
            }
        },
        {
            path: '/devops/elk',
            name: 'ELK',
            component: () => import('@/views/devops/elk'),
            meta: {
                title: 'ELK日志系统',
                icon: 'link'
            }
        },
        {
            path: '/devops/skywalking',
            name: 'skywalking',
            component: () => import('@/views/devops/skywalking'),
            meta: {
                title: '应用性能管理',
                icon: 'link'
            }
        },
        {
            path: '/devops/sentinel',
            name: 'sentinel',
            component: () => import('@/views/devops/sentinel'),
            meta: {
                title: '服务治理',
                icon: 'link'
            }
        },
        {
            path: '/devops/xxljob',
            name: 'xxljob',
            component: () => import('@/views/devops/xxljob'),
            meta: {
                title: '任务调度中心',
                icon: 'link'
            }
        }
    ]
}

export default devopsRouter
