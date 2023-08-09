import router from "@/router";
import store from '@/store'
import db from '@/utils/localStorage'

const whiteList = ['/login']


router.beforeEach(async (to, from, next) => {
    if (store.getters.token) {
        console.log("存在token")
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            if (store.getters.status === false) {
                console.log("还未拉取路由")
                // console.log(router)
                // console.log(router.getRoutes())
                const accessRoutes = await store.dispatch('permisson/Get_asyncRoute')
                // 异步获取的路由刷新后会出现消失问题

                accessRoutes.forEach(item => {
                    router.addRoute(item)
                })
                // console.log(router.getRoutes())
                // router.addRoute(...accessRoutes)
                next({...to})
            } else {
                console.log("已经拉取路由")
                next()
                // next({path:'/',query:{noGoBack: true}})
            }
        }
    } else {
        console.log("不存在token")
        console.log(router.getRoutes())
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
        }
    }
})
