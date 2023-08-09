import SvgIcon from '../components/SvgIcon/index'




//注册引用的字节跳动图标
import {Theme,User,Save,EthernetOn,Cpu,Disk,MemoryOne} from "@icon-park/vue-next";
import '@icon-park/vue-next/styles/index.css'
export const components = [
    Theme,User,Save,EthernetOn,Cpu,Disk,MemoryOne
];


//使用svg文件夹下的svg样式的图片必须添加
const svgRequired = require.context('./svg', false, /\.svg$/)
svgRequired.keys().forEach((item) => svgRequired(item))


export default (app) => {
    //全局注册SvgIcon组件，使用svg-icon标签
    app.component('svg-icon', SvgIcon)
    components.forEach((component) => {
        //这里的component是一个对象，包含name,props等属性，其中name有icon-user,icon-lock,即有icon前缀，这里将icon前缀去掉并注册为相应的组件
        app.component(component.name.replace('icon-', ''), component);
    });
};
