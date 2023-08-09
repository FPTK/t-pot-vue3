import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './login.js'

import 'element-plus/dist/index.css'

import './styles/index.scss'
import 'element-plus/theme-chalk/display.css'


const app = createApp(App)


//注册使用的element图标
import * as ELIcons from '@element-plus/icons-vue'
for (const iconName in ELIcons) {
    //iconName是element plus中图标的名称
    app.component(iconName, ELIcons[iconName])
}

//注册svg图标
import SvgIcon from './icons/index'
SvgIcon(app)


//使用echarts
import * as echarts from 'echarts'
app.config.globalProperties.$echarts = echarts


app.use(router).use(store).mount('#app')

//引入mock
require('./mock')

// 解决bug：页面/路由跳转后，滚动条消失，页面无法滚动
router.afterEach((to, from, next) => {
    document.querySelector("body").setAttribute("style", "overflow: auto !important;")
});