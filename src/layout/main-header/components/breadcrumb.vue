<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbList"
                          :key="index">
      <span class="no-redirect" v-if="index===breadcrumbList.length-1">
         {{ item.meta.name }}
      </span>
        <span class="redirect" v-else @click="handleRedirect(item.path)">
        {{ item.meta.name }}
      </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import {useRouter, useRoute} from 'vue-router'
import {ref, watch} from "vue";

export default {
  name: "breadcrumb",
  setup() {
    const router = useRouter()
    const route = useRoute()
    const breadcrumbList = ref([])
    const title = ref([
      {
        path: '/',
        name: '/',
        meta: {
          name: '首页'
        }
      }
    ])
    const initBreadcrumb = () => {

      breadcrumbList.value = title.value.concat(route.matched)
    }

    const handleRedirect = (path) => {
      router.push(path)
    }
    watch(route,
        () => {
          // console.log(route.path)
          initBreadcrumb()
        },
        {
          deep: true,
          immediate: true
        })
    return {
      breadcrumbList,
      handleRedirect
    }
  }
}
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}

.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #bfcbd9;
  }
}
</style>