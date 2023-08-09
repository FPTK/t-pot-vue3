<template>

    <el-dropdown>
<!--        <span>-->
<!--          <el-icon :size="20" color="white">-->
<!--            <user/>-->
<!--          </el-icon>-->
<!--        </span>-->
<!--      此处使用的是字节的图标库-->
      <user size="18" style="color: white"></user>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="change">修改密码</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>

<script>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {resetRouter} from "@/router";
export default {
  name: "avatar",
  setup() {

    const store = useStore()
    const router = useRouter()

    function logout() {
      store.dispatch('permisson/LogOut').then(()=>{
        console.log("退出")
        router.push({path:'/login'})
        resetRouter()
      })
    }

    function change() {
      console.log("修改密码")
    }

    return {
      logout,
      change
    }
  }
}
</script>

<style scoped>

</style>