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
            path: '/devops/nacos/register',
            name: 'Register',
            component: Layout,
            meta: {
                title: '注册中心',
                icon: 'link'
            },
            children: [
                {
                    path: 'http://129.211.34.120:8848/nacos',
                    meta: {
                        title: '注册中心',
                        icon: 'link'
                    }
                }
            ]
        },
        {
            path: '/devops/nacos/config',
            name: 'Config',
            component: Layout,
            meta: {
                title: '配置中心',
                icon: 'link'
            },
            children: [
                {
                    path: 'http://129.211.34.120:8848/nacos',
                    meta: {
                        title: '配置中心',
                        icon: 'link'
                    }
                }
            ]
        },
       /* {
            path: '/devops/sentinel',
            name: 'SentinelDashBoard',
            component: () => import('@/views/devops/sentinel'),
            meta: {
                title: '服务运维',
                icon: 'link'
            }
        },
        {
            path: '/devops/moss',
            name: 'Moss',
            component: () => import('@/views/devops/moss'),
            meta: {
                title: '服务管理',
                icon: 'link'
            }
        },
        {
            path: '/devops/swagger',
            name: 'Swagger',
            component: () => import('@/views/devops/swagger'),
            meta: {
                title: '聚合文档',
                icon: 'link'
            }
        }*/
    ]
}

export default devopsRouter
