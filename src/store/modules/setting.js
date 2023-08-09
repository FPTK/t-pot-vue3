import {themeConfig} from "@/config/theme";

const {theme} = themeConfig

const state = {
    isDrawerSetting: false,//是否打开主题设置抽屉
    theme
}

const getters = {
    theme: (state) => state.theme,
    isDrawerSetting: (state) => state.isDrawerSetting,
    settings: (state) => state, //返回全部状态
}

const mutations = {
    /**
     * 打开主题设置
     * @param state
     * @param flag
     */
    change_setting_drawer: (state, flag) => {
        state.isDrawerSetting = flag
    },

    /**
     * 更换主题
     * @param state
     * @param theme
     */
    set_theme:(state,theme)=>{
        state.theme = theme
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations
}
