<template>
  <!--  设置element-plus中文选项-->
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { onBeforeMount } from "vue";

export default {
  name: "App",
  setup() {
    // document.querySelector('#app').className = 'add_app1'
    onBeforeMount(() => {
      // console.log("挂载")
      document.querySelector("#app").className = "add_app1";
    });
    return {
      zhCn,
    };
  },
};
</script>

<style>
.add_app1 {
  height: 100%;
}
</style>
