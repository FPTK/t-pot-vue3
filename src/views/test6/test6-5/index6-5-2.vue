<template>
  <el-card shadow="never">
    <div>
      <el-row style="align-items: center">
        <el-col :span="2">
          <span style="letter-spacing: 1px">手动更新:</span>
        </el-col>

        <el-col :span="5">
          <el-date-picker
              v-model="MANUAL_TIME"
              type="datetime"
              value-format="YYYY-MM-DD hh:mm:ss"
          >
          </el-date-picker>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" @click="change">保存</el-button>
        </el-col>

      </el-row>
    </div>

    <el-divider/>


    <div>
      <el-row style="align-items: center">
        <el-col :span="2">
          <span style="letter-spacing: 1px">NTP服务器:</span>
        </el-col>

        <el-col :span="5">
          <el-date-picker
              v-model="NTP_TIME"
              type="datetime"
              value-format="YYYY-MM-DD hh:mm:ss"
          >
          </el-date-picker>
        </el-col>

        <el-col :span="2">
          <el-button type="primary">保存</el-button>
        </el-col>

      </el-row>
    </div>
  </el-card>
</template>

<script>
import {ref} from 'vue'

export default {
  name: "index6-5-2",
  setup() {

    // 手动更新时间
    const MANUAL_TIME = ref('')

    // NPT服务器时间
    const NTP_TIME = ref('')


    function change() {
      console.log(MANUAL_TIME.value)
    }

    return {
      MANUAL_TIME,
      NTP_TIME,
      change
    }
  }
}
</script>

<style scoped>

</style>