export const menu = [
    {
        label:'威胁管理',
        path: '/test2',
        icon:'location',
        children:[
            {
                label:'风险大盘',
                path:'/test2-1'
            },
            {
                label:'威胁情报',
                path:'/test2-2'
            }
        ]
    },
    {
        label:'蜜网管理',
        path: '/test3',
        icon:'location',
        children:[
            {
                label:'蜜网管理',
                path:'/test3-1'
            },
            {
                label:'蜜罐管理',
                path:'/test3-2'
            },
            {
                label: '节点管理',
                path:'/test3-3'
            },
            {
                label:'镜像管理',
                path:'/test3-4'
            }
        ]
    },
    {
        label:'数据管理',
        path: '/test4',
        icon:'location',
        children:[
            {
                label:'数据报表',
                path:'/test4-1'
            },
            {
                label:'攻击源分析',
                path:'/test4-2'
            },
            {
                label: '攻击画像',
                path:'/test4-3'
            }
        ]
    },
    {
        label:'日志审计',
        path: '/test5',
        icon:'location',
        children:[
            {
                label:'操作日志',
                path:'/test5-1'
            },
            {
                label:'报警日志',
                path:'/test5-2'
            },
            {
                label: '攻击日志',
                path:'/test5-3'
            }
        ]
    },
    {
        label:'系统管理',
        path: '/test6',
        icon:'location',
        children:[
            {
                label:'系统状态',
                path:'/test6-1'
            },
            {
                label:'告警管理',
                path:'/test6-2',
                children:[
                    {
                        label:'邮件警告',
                        path:'/test6-2-1'
                    },
                    {
                        label:'短信警告',
                        path:'/test6-2-2'
                    },
                    {
                        label:'微信警告',
                        path:'/test6-2-3'
                    }
                ]
            },
            {
                label: '用户管理',
                path:'/test6-3'
            },
            {
                label: '三方联动',
                path:'/test6-4'
            },
            {
                label:'系统维护',
                path:'/test6-5',
                children:[
                    {
                        label:'备份恢复',
                        path:'/test6-5-1'
                    },
                    {
                        label:'时间维护',
                        path:'/test6-5-2'
                    },
                    {
                        label:'权限维护',
                        path:'/test6-5-3'
                    }
                ]
            },
            {
                label: '关于系统',
                path: '/test6-6'
            }
        ]
    },
    {
        label:'报表中心',
        path:'/test7',
        icon:'location',
        children: [
            {
                label:'汇总报表',
                path:'/test7-1'
            }
        ]
    }
]