import {createStore} from 'vuex'
import app from './modules/app'
import permisson from './modules/permisson'
import setting from './modules/setting'
import createPersistedState from 'vuex-persistedstate'
import getters from "@/store/getters";
export default createStore({
    modules:{
        app,
        setting,
        permisson
    },
    getters,
    // plugins:[
    //     createPersistedState()
    // ]
})