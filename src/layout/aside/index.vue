<template>
  <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view">
    <!--  <el-scrollbar height="100vh">-->
    <el-menu
        class="el-menu-vertical-demo"
        :background-color="menuBgColor"
        :text-color="textColor"
        :collapse-transition="false"
        :collapse="!isCollapse"
        router
    >
      <template v-for="(item,index) in menu" :key="index">

        <el-menu-item v-if="!item.children" :index="item.path" :key="index">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.label }}</span>
          </template>
        </el-menu-item>

        <el-sub-menu v-if="item.children" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.label }}</span>
          </template>

          <template v-for="(item_children,index) in item.children" :key="index">

            <el-menu-item v-if="!item_children.children" :index="item_children.path">
              {{ item_children.label }}
            </el-menu-item>

            <el-sub-menu :index="item_children.path" v-if="item_children.children">
              <template #title>
                <span>{{ item_children.label }}</span>
              </template>

              <el-menu-item v-for="(item_list,index) in item_children.children" :key="index" :index="item_list.path">
                {{ item_list.label }}
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import {menu} from './menu'
import {useStore} from 'vuex'
import {computed, watch, ref, onMounted} from 'vue'
import {themeConfig} from "@/config/theme";

export default {
  name: "index",
  setup() {


    const store = useStore()
    const isCollapse = computed(() => {
      return store.getters.siderType
    })

    //获取主题颜色配置
    const {colorOptions} = themeConfig
    const whiteColors = ['#fff', '#ffffff', '#FFF', '#FFF', 'rgb(255, 255, 255)'];


    const theme = computed(() => {
      return store.getters['setting/theme']
    })

    //菜单背景颜色
    const menuBgColor = computed(() => {
      return colorOptions[theme.value].menuBgColor
    })

    //菜单栏图标和字体颜色(未选中以及未聚焦时的颜色,也就是初始化时的颜色）
    const textColor = computed(() => {
      //如果菜单不是白色，那么图标和字体颜色设置为灰色，否则设置为白色
      return whiteColors.indexOf(menuBgColor.value) !== -1 ? '#333' : '#fff'
    })

    //选中菜单栏之后图标和字体的颜色
    const activeTextColor = computed(() => {
      // const mcolor = whiteColors.indexOf(menuBgColor.value) !== -1;
      //如果菜单栏是白色，那么设置为 ;如果是白色，
      // return mcolor ? theme : '#fff';
      return colorOptions[theme.value].primary
    })


    const addRouters = computed(() => {
      return store.getters.addRouters
    })

    // const menu = ref([])
    // 不能添加到菜单中的路由项
    const Not_in_menu_routes = ['/report_detail']


    // 递归获取菜单
    function GenerateMenu(routes) {
      let a = []
      // 使用递归的话不能使用for...of...循环
      for (let i = 0; i < routes.length; i++) {
        if (Not_in_menu_routes.indexOf(routes[i].path) >= 0) continue
        let menu_item = {}
        if (routes[i].path === '/') {
          GenerateMenu([...routes[i].children])
        } else {
          menu_item.label = routes[i].meta.name
          menu_item.path = routes[i].path
          if (routes[i].meta && routes[i].meta.icon) {
            menu_item.icon = routes[i].meta.icon
          }
          // tag = '0' 是添加在/路由下
          // if (routes[i].tag && routes[i].tag === '0') {
          //   menu.value.push(menu_item)
          // }
          if (routes[i].children) {
            // js中的浅拷贝和深拷贝问题
            menu_item.children = GenerateMenu(routes[i].children)
            // tag = '1' 必须添加到有三级路由的二级路由以及有四级路由的三级路由种
            if (!routes[i].tag) {
              menu.value.push(menu_item)
            }
          }
        }
        a.push(menu_item)
      }
      return a
    }

    // onMounted(() => {
    //   GenerateMenu(addRouters.value)
    // })
    return {
      isCollapse,
      textColor,
      activeTextColor,
      menuBgColor,
      menu: menu
    }
  }
}
</script>

<style lang="scss" scoped>


.el-menu-vertical-demo {
  border: none;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  width: 100% !important;
}

//竖向滚动条设置颜色
//::v-deep .el-scrollbar__bar.is-vertical > div {
//  background-color: #575f7b;
//}

// 隐藏横线滚动条
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

// 隐藏竖向滚动条
::v-deep .el-scrollbar__bar.is-vertical > div {
  background-color: transparent;
}
</style>