<template>
  <el-row>
    <hamburger/>
    <breadcrumb/>
  </el-row>
</template>

<script>
import Breadcrumb from "@/layout/main-header/components/breadcrumb";
import hamburger from "@/layout/main-header/components/hamburger";
import {useRoute} from 'vue-router'


export default {
  name: "index",
  components: {Breadcrumb, hamburger},
  setup() {}
}
</script>

<!--<script setup>-->
<!--import Breadcrumb from "@/layout/main-header/components/breadcrumb";-->
<!--import hamburger from "@/layout/main-header/components/hamburger";-->
<!--import {useRoute} from 'vue-router'-->
<!--import {defineProps, watch} from 'vue'-->

<!--const props = defineProps({-->
<!--  routeList: {-->
<!--    type: Array,-->
<!--    default: () => []-->
<!--  }-->
<!--})-->
<!--watch(props,()=>{-->
<!--  console.log(props)-->
<!--})-->
<!--</script>-->

<style scoped>

</style>