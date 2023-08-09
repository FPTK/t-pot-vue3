<template>
  <div class="hamburger-container">
    <el-icon>
      <component :is="icon" @click="click"></component>
    </el-icon>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from "vue";

export default {
  name: "hamburger",
  setup() {
    const store = useStore()

    const icon = computed(() => {
      return store.getters.siderType ?'caret-left':'caret-right'
    })

    const click = () => {
      store.commit('app/changeSiderType')
    }
    return {
      icon,
      click
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  width: 20px;

}
</style>