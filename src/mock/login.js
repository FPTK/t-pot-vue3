export default {
    login: params => {
        const {username, password} = JSON.parse(params.body)
        // console.log(username, password)
        let token
        if (username === 'admin') {
            token = 'admin'
        }
        if (username === 'audit') {
            token = 'audit'
        }
        if (username === 'superman') {
            token = 'superman'
        }
        return {
            token: token
        }
    },
    getRoute: (params) => {
        const user = params.body
        console.log(user)
        let asyncRoutes
        if (user === 'superman') {
            asyncRoutes = [
                {
                    path: '/',
                    name: '/',
                    component: 'layout/index',
                    meta: {
                        name: '首页'
                    },
                    redirect: '/test2',
                    children: []
                },
                {
                    path: '/test2',
                    name: 'test2',
                    meta: {
                        name: '威胁管理',
                        icon: 'location'
                    },
                    component: 'layout/index',
                    redirect: '/test2-1',
                    children: [
                        {
                            path: '/test2-1',
                            name: 'test2-1',
                            meta: {
                                name: '风险大屏'
                            },
                            component: 'views/test2/index2-1'
                        },
                        {
                            path: '/test2-2',
                            name: 'test2-2',
                            meta: {
                                name: '威胁情报'
                            },
                            component: 'views/test2/index2-2'
                        },
                    ]
                },
                {
                    path: '/test7',
                    name: 'test7',
                    meta: {
                        name: '报表中心',
                        icon: 'location',
                    },
                    // component: () => import('../layout'),
                    component: 'layout/index',
                    redirect: 'test7-1',
                    children: [
                        {
                            path: '/test7-1',
                            name: 'test7-1',
                            meta: {
                                name: '汇总报表'
                            },
                            // component: () => import('../views/test7/index7-1')
                            component: 'views/test7/index7-1'
                        }
                    ]
                },
                {
                    path: '/report_detail',
                    name: 'report_detail',
                    // component: () => import('../views/test7/report/report_detail')
                    component: 'views/test7/report/report_detail'
                },
                {
                    path: '/test3',
                    name: 'test3',
                    meta: {
                        name: '蜜网管理',
                        icon: 'location'
                    },
                    component: 'layout/index',
                    redirect: '/test3-1',
                    children: [
                        {
                            path: '/test3-1',
                            name: 'test3-1',
                            meta: {
                                name: '蜜网管理'
                            },
                            component: 'views/test3/index3-1'
                        },
                        {
                            path: '/test3-3',
                            name: 'test3-3',
                            meta: {
                                name: '节点管理'
                            },
                            component: 'views/test3/index3-3'
                        },
                        {
                            path: '/test3-2',
                            name: 'test3-2',
                            meta: {
                                name: '蜜罐管理'
                            },
                            component: 'views/test3/index3-2'
                        },
                    ]
                },
                // {
                //     path: '/test4',
                //     name: 'test4',
                //     meta: {
                //         icon: 'location',
                //         name: '数据管理'
                //     },
                //     // component: () => import('../layout'),
                //     // component: 'views/test4/index',
                //     component: 'layout/index',
                //     redirect: '/test4-1',
                //     children: [
                //         {
                //             path: '/test4-1',
                //             name: 'test4-1',
                //             meta: {
                //                 name: '数据报表'
                //             },
                //             // component: () => import('../views/test4/index4-1')
                //             component: 'views/test4/index4-1'
                //         },
                //         {
                //             path: '/test4-2',
                //             name: 'test4-2',
                //             meta: {
                //                 name: '攻击源分析'
                //             },
                //             // component: () => import('../views/test4/index4-2')
                //             component: 'views/test4/index4-2'
                //         },
                //         {
                //             path: '/test4-3',
                //             name: 'test4-3',
                //             meta: {
                //                 name: '攻击画像'
                //             },
                //             // component: () => import('../views/test4/index4-3')
                //             component: 'views/test4/index4-3'
                //         },
                //     ]
                // },
                {
                    path: '/test5',
                    name: 'test5',
                    meta: {
                        name: '日志审计',
                        icon: 'location'
                    },
                    // component: () => import('../layout'),
                    component: 'layout/index',
                    redirect: '/test5-1',
                    children: [
                        {
                            path: '/test5-3',
                            name: 'test5-3',
                            meta: {
                                name: '日志中心'
                            },
                            // component: () => import('../views/test5/index5-3')
                            component: 'views/test5/index5-3'
                        },
                        {
                            path: '/test5-1',
                            name: 'test5-1',
                            meta: {
                                name: '操作日志',
                            },
                            // component: () => import('../views/test5/index5-1')
                            component: 'views/test5/index5-1'
                        },
                        // {
                        //     path: '/test5-2',
                        //     name: 'test5-2',
                        //     meta: {
                        //         name: '报警日志'
                        //     },
                        //     // component: () => import('../views/test5/index5-2')
                        //     component: 'views/test5/index5-2'
                        // },
                    ]
                },
                {
                    path: '/test6',
                    name: 'test6',
                    meta: {
                        name: '系统管理',
                        icon: 'location'
                    },
                    component: 'layout/index',
                    redirect: '/test6-1',
                    children: [
                        {
                            path: '/test6-1',
                            name: 'test6-1',
                            meta: {
                                name: '系统状态'
                            },
                            component: 'views/test6/index6-1'
                        },
                        {
                            path: '/test6-2',
                            name: 'test6-2',
                            meta: {
                                name: '告警管理'
                            },
                            tag: '1',
                            redirect: '/test6-2-1',
                            component: 'views/test6/index',
                            children: [
                                {
                                    path: '/test6-2-1',
                                    name: 'test6-2-1',
                                    meta: {
                                        name: "邮件警告"
                                    },
                                    component: 'views/test6/test6-2/index6-2-1',
                                },
                                {
                                    path: '/test6-2-2',
                                    name: 'test6-2-2',
                                    meta: {
                                        name: "短信警告"
                                    },
                                    component: 'views/test6/test6-2/index6-2-2',
                                },
                                {
                                    path: '/test6-2-3',
                                    name: 'test6-2-3',
                                    meta: {
                                        name: "微信警告"
                                    },
                                    component: 'views/test6/test6-2/index6-2-3',
                                },
                            ]
                        },
                        // {
                        //     path: '/test6-3',
                        //     name: 'test6-3',
                        //     meta: {
                        //         name: '用户管理'
                        //     },
                        //     component: 'views/test6/index6-3'
                        // },
                        {
                            path: '/test6-4',
                            name: 'test6-4',
                            meta: {
                                name: '三方联动'
                            },
                            component: 'views/test6/index6-4'
                        },
                        {
                            path: '/test6-5',
                            name: 'test6-5',
                            meta: {
                                name: '系统维护'
                            },
                            tag: '1',
                            redirect: '/test6-5-1',
                            component: 'views/test6/index',
                            children: [
                                {
                                    path: '/test6-5-1',
                                    name: 'test6-5-1',
                                    meta: {
                                        name: "备份恢复"
                                    },
                                    component: 'views/test6/test6-5/index6-5-1'
                                },
                                {
                                    path: '/test6-5-2',
                                    name: 'test6-5-2',
                                    meta: {
                                        name: "时间维护"
                                    },
                                    component: 'views/test6/test6-5/index6-5-2'
                                },
                                {
                                    path: '/test6-5-3',
                                    name: 'test6-5-3',
                                    meta: {
                                        name: "权限维护"
                                    },
                                    component: 'views/test6/test6-5/index6-5-3'
                                },
                            ]
                        },
                        {
                            path: '/test6-6',
                            name: 'test6-6',
                            meta: {
                                name: '关于系统'
                            },
                            component: 'views/test6/index6-6'
                        },
                    ]
                },
            ]
        }
        if (user === 'audit') {
            asyncRoutes = [
                {
                    path: '/',
                    name: '/',
                    component: 'layout/index',
                    meta: {
                        name: '首页'
                    },
                    redirect: '/test8',
                    children: []
                },
                {
                    path: '/test8',
                    name: 'test8',
                    meta: {
                        icon: 'location',
                        name: '审计管理'
                    },

                    component: 'layout/index',
                    redirect: '/test8-1',
                    children: [
                        {
                            path: '/test8-1',
                            name: 'test8-1',
                            meta: {
                                name: '审计日志'
                            },
                            // component: () => import('../views/test4/index4-1')
                            component: 'views/test8/index8-1'
                        },
                    ]
                }
            ]
        }
        if (user === 'admin') {
            asyncRoutes = [
                {
                    path: '/',
                    name: '/',
                    component: 'layout/index',
                    meta: {
                        name: '首页'
                    },
                    redirect: '/test9',
                    children: []
                },
                {
                    path: '/test9',
                    name: 'test9',
                    meta: {
                        icon: 'location',
                        name: '权限管理'
                    },
                    component: 'layout/index',
                    redirect: '/test9-1',
                    children: [
                        {
                            path: '/test9-1',
                            name: 'test9-1',
                            meta: {
                                name: '账号管理'
                            },
                            // component: () => import('../views/test4/index4-1')
                            component: 'views/test9/index9-1'
                        },
                    ]
                }
            ]
        }
        return asyncRoutes
    },

    logout: () => 'success'
}