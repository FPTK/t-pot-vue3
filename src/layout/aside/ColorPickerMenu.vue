<template>
  <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view">
    <!--  <el-scrollbar height="100vh">-->
    <el-menu
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#333"
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

            <el-menu-item v-if="!item_children.list" :index="item_children.path">
              {{ item_children.label }}
            </el-menu-item>

            <el-sub-menu :index="item_children.path" v-if="item_children.list">
              <template #title>
                <span>{{ item_children.label }}</span>
              </template>

              <el-menu-item v-for="(item_list,index) in item_children.list" :key="index" :index="item_list.path">
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
import {computed} from 'vue'
export default {
  name: "ColorPickerMenu",
  setup() {


    const store = useStore()
    const isCollapse = computed(() => {
      return store.getters.siderType
    })


    return {
      isCollapse,
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
  //width: 100% !important;
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