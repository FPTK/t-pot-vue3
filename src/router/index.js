import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login')
    },
    {
        path: '/',
        name: '/',
        component: () =>
            import ('../layout'),
        meta: {
            name: '首页'
        },
        redirect: '/test2',
        children: []
    },

    {
        path: '/bigDataVisual',
        name: 'bigDataVisual',
        component: () =>
            import ('../views/test2/test2-1/BigDataVisual')
    },
    {
        path: '/Trend',
        name: 'Trend',
        component: () =>
            import ('../views/test2/test2-1/Trend')
    },
    {
        path: '/test2',
        name: 'test2',
        meta: {
            name: '威胁管理'
        },
        component: () =>
            import ('../layout'),
        redirect: '/test2-2',
        children: [{
                path: '/test2-1',
                name: 'test2-1',
                meta: {
                    name: '风险大盘'
                },
                component: () =>
                    import ('../layout'),
                // redirect: '/bigDataVisual'
                redirect: '/Trend'
                    // component: () => import('../views/test2/index2-1'),
            },
            {
                path: '/test2-2',
                name: 'test2-2',
                meta: {
                    name: '威胁情报'
                },
                component: () =>
                    import ('../views/test2/index2-2')
            },
        ]
    },
    {
        path: '/test3',
        name: 'test3',
        meta: {
            name: '蜜网管理'
        },
        component: () =>
            import ('../layout'),
        redirect: '/test3-1',
        children: [{
                path: '/test3-1',
                name: 'test3-1',
                meta: {
                    name: '蜜网节点管理'
                },
                component: () =>
                    import ('../views/test3/index3-1')
            },
            {
                path: '/test3-2',
                name: 'test3-2',
                meta: {
                    name: '蜜罐管理'
                },
                component: () =>
                    import ('../views/test3/index3-2')
            },
            {
                path: '/test3-3',
                name: 'test3-3',
                meta: {
                    name: '蜜铒管理'
                },
                component: () =>
                    import ('../views/test3/index3-3')
            },
            {
                path: '/test3-4',
                name: 'test3-4',
                meta: {
                    name: '镜像管理'
                },
                component: () =>
                    import ('../views/test3/index3-4')
            },
        ]
    },
    {
        path: '/test4',
        name: 'test4',
        meta: {
            name: '数据管理'
        },
        component: () =>
            import ('../layout'),
        redirect: '/test4-1',
        children: [{
                path: '/test4-1',
                name: 'test4-1',
                meta: {
                    name: '数据报表'
                },
                component: () =>
                    import ('../views/test4/index4-1')
            },
            {
                path: '/test4-2',
                name: 'test4-2',
                meta: {
                    name: '攻击源分析'
                },
                component: () =>
                    import ('../views/test4/index4-2')
            },
            {
                path: '/test4-3',
                name: 'test4-3',
                meta: {
                    name: '攻击画像'
                },
                component: () =>
                    import ('../views/test4/index4-3')
            },
        ]
    },
    {
        path: '/test5',
        name: 'test5',
        meta: {
            name: '日志审计'
        },
        component: () =>
            import ('../layout'),
        redirect: '/test5-1',
        children: [{
                path: '/test5-1',
                name: 'test5-1',
                meta: {
                    name: '操作日志'
                },
                component: () =>
                    import ('../views/test5/index5-1')
            },
            {
                path: '/test5-2',
                name: 'test5-2',
                meta: {
                    name: '报警日志'
                },
                component: () =>
                    import ('../views/test5/index5-2')
            },
            {
                path: '/test5-3',
                name: 'test5-3',
                meta: {
                    name: '攻击日志'
                },
                component: () =>
                    import ('../views/test5/index5-3')
            },
        ]
    },
    {
        path: '/test6',
        name: 'test6',
        meta: {
            name: '系统管理'
        },
        component: () =>
            import ('../layout'),
        redirect: '/test6-1',
        children: [{
                path: '/test6-1',
                name: 'test6-1',
                meta: {
                    name: '系统状态'
                },
                component: () =>
                    import ('../views/test6/index6-1')
            },
            {
                path: '/test6-2',
                name: 'test6-2',
                meta: {
                    name: '告警管理'
                },
                redirect: '/test6-2-1',
                component: () =>
                    import ('../views/test6/'),
                children: [{
                        path: '/test6-2-1',
                        name: 'test6-2-1',
                        meta: {
                            name: "邮件警告"
                        },
                        component: () =>
                            import ('../views/test6/test6-2/index6-2-1')
                    },
                    {
                        path: '/test6-2-2',
                        name: 'test6-2-2',
                        meta: {
                            name: "短信警告"
                        },
                        component: () =>
                            import ('../views/test6/test6-2/index6-2-2')
                    },
                    {
                        path: '/test6-2-3',
                        name: 'test6-2-3',
                        meta: {
                            name: "微信警告"
                        },
                        component: () =>
                            import ('../views/test6/test6-2/index6-2-3')
                    },
                ]
            },
            {
                path: '/test6-3',
                name: 'test6-3',
                meta: {
                    name: '用户管理'
                },
                component: () =>
                    import ('../views/test6/index6-3')
            },
            {
                path: '/test6-4',
                name: 'test6-4',
                meta: {
                    name: '三方联动'
                },
                component: () =>
                    import ('../views/test6/index6-4')
            },
            {
                path: '/test6-5',
                name: 'test6-5',
                meta: {
                    name: '系统维护'
                },
                redirect: '/test6-5-1',
                component: () =>
                    import ('../views/test6/'),
                children: [{
                        path: '/test6-5-1',
                        name: 'test6-5-1',
                        meta: {
                            name: "备份恢复"
                        },
                        component: () =>
                            import ('../views/test6/test6-5/index6-5-1')
                    },
                    {
                        path: '/test6-5-2',
                        name: 'test6-5-2',
                        meta: {
                            name: "时间维护"
                        },
                        component: () =>
                            import ('../views/test6/test6-5/index6-5-2')
                    },
                    {
                        path: '/test6-5-3',
                        name: 'test6-5-3',
                        meta: {
                            name: "权限维护"
                        },
                        component: () =>
                            import ('../views/test6/test6-5/index6-5-3')
                    },
                ]
            },
            {
                path: '/test6-6',
                name: 'test6-6',
                meta: {
                    name: '关于系统'
                },
                component: () =>
                    import ('../views/test6/index6-6')
            },
        ]
    },
    {
        path: '/test7',
        name: 'test7',
        meta: {
            name: '报表中心'
        },
        component: () =>
            import ('../layout'),
        redirect: 'test7-1',
        children: [{
            path: '/test7-1',
            name: 'test7-1',
            meta: {
                name: '汇总报表'
            },
            component: () =>
                import ('../views/test7/index7-1')
        }]
    },
    {
        path: '/report_detail',
        name: 'report_detail',
        component: () =>
            import ('../views/test7/report/report_detail')
    }
]


export let constantRoutes = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('../views/login')
}]

const router = createRouter({
    // routes: constantRoutes,
    routes: routes,
    history: createWebHashHistory()
})


// 重置路由
export function resetRouter() {
    // console.log(router.getRoutes())
    router.getRoutes().forEach(route => {
        const { name } = route;
        if (name) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
    constantRoutes.forEach(route => {
        router.addRoute(route)
    })
    console.log(router.getRoutes())
}


export default router