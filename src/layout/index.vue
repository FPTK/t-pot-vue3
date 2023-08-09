<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-container>

        <el-aside :width="asideWidth" class="aside">
          <Aside/>
        </el-aside>
      <el-main class="main">

        <main_Header v-if="exist_header"></main_Header>
<!--        动态路由时不使用v-if-->
<!--        <main_Header></main_Header>-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './header/index'

import Aside from './aside/index'
// import Aside from './aside/ColorPickerMenu'

import main_Header from './main-header'
import {useStore} from 'vuex'
import {computed, watch, ref} from "vue";
import {useRoute} from 'vue-router'

export default {
  name: "index",
  components: {
    Header,
    Aside,
    main_Header
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const asideWidth = computed(() => {
      return store.getters.siderType ? "220px" : "70px"
    })

    const exist_header = ref(false)

    watch(route,
        () => {
          if (route.matched[0].path === '/') {
            exist_header.value = false
          } else {
            exist_header.value = true
          }
        }, {
          deep: true,
          immediate: true
        })
    // console.log(process.env.VUE_APP_BASE_API)
    return {
      asideWidth,
      exist_header
    }
  }
}
</script>

<style lang="scss" scoped>


.aside {
  transition: width 0.28s;
  overflow: hidden;
}

::v-deep .main {
  padding-left: 15px;
}
</style>