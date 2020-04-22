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
            path: '/nacos',
            name: 'Register',
            component: () => import('@/views/devops/nacos'),
            meta: {
                title: '注册与配置中心',
                icon: 'link'
            }
        },
        {
            path: '/swagger',
            name: 'Swagger',
            component: () => import('@/views/devops/swagger'),
            meta: {
                title: 'swagger接口文档',
                icon: 'link'
            }
        },
        {
            path: '/portainer',
            name: 'Portainer',
            component: () => import('@/views/devops/portainer'),
            meta: {
                title: '容器管理',
                icon: 'link'
            }
        },
        {
            path: '/rabbitmq',
            name: 'RabbitMQ',
            component: () => import('@/views/devops/rabbitmq'),
            meta: {
                title: '消息队列',
                icon: 'link'
            }
        },
        {
            path: '/elk',
            name: 'ELK',
            component: () => import('@/views/devops/elk'),
            meta: {
                title: 'ELK日志系统',
                icon: 'link'
            }
        },
        {
            path: '/skywalking',
            name: 'skywalking',
            component: () => import('@/views/devops/skywalking'),
            meta: {
                title: '链路追踪系统',
                icon: 'link'
            }
        },
        {
            path: '/sentinel',
            name: 'sentinel',
            component: () => import('@/views/devops/sentinel'),
            meta: {
                title: '服务治理',
                icon: 'link'
            }
        },
        {
            path: '/xxljob',
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
