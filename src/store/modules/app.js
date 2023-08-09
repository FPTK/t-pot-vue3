
export default {
    namespaced: true,
    state: {
        siderType: true,  //菜单栏状态（展开/伸缩）
        ThemeColor:"#409EFF"  //主题颜色
    },
    mutations: {
        changeSiderType(state) {
            state.siderType = !state.siderType
        },
        changeTheme(state, val) {
            state.ThemeColor = val
        }
    }
}