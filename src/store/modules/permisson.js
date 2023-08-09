import {constantRoutes} from '@/router/index'
import {Route_mock, Logout_mock} from "@/api/login";
import {getRoutes} from "@/utils/get-routes";
import db from '@/utils/localStorage'

const state = {
    // 是否已经拉取路由
    status: false,
    // 设置为会话存储之后刷新页面此值不会消失，还是会采用存储的值
    token: db.get('token') || '',

    // 未存储在本地或者session中的vuex值在页面刷新后会清空
    routers: constantRoutes,
    addRouters: [],
}

const mutations = {
    SET_ROUTERS(state, routers) {
        state.status = true

        state.addRouters = routers
        state.routers = constantRoutes.concat(routers)
    },
    SET_TOKEN(state, token) {
        state.token = token
        db.save('token', token)
    },
    CLEAR_TOKEN(state) {
        state.token = ''
        db.clear()
    }


}

const actions = {
    // 获取异步路由
    Get_asyncRoute({commit, state}) {
        return new Promise(async resolve => {
            // 根据用户角色异步请求获取动态路由
            const res = await Route_mock(state.token)
            const asyncRoutes = getRoutes(res.data)

            commit('SET_ROUTERS', asyncRoutes)
            // console.log(asyncRoutes)
            resolve(asyncRoutes)
        })
    },

    // 退出
    LogOut({commit, state}) {
        return new Promise((resolve, reject) => {
            Logout_mock(state.token).then(() => {
                commit('CLEAR_TOKEN')
                state.status = false
                // commit('SET_ROUTERS', [])
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
