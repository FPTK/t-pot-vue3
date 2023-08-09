<template>
  <el-card>
    <el-table
        ref="multipleTableRef"
        style="width:100%"
        :data="tableData"
        @selection-change="handleSelectionChange"
        v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-for="(item,index) in options" :prop="item.prop" :label="item.label" :key="index">

        <template #default="scope" v-if="item.prop === 'actions'">
          <el-link type="info" @click="handleEdit(scope.$index,scope.row)" style="margin-right: 10px">编辑
          </el-link>
          <el-link type="danger" @click="handleRemove(scope.$index,scope.row)" style="margin-right: 10px">删除
          </el-link>
        </template>

        <template #default="scope" v-if="item.prop === 'status'">
          <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              :before-change="beforeChange"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import {Docker_Image} from "@/api/honey";
import {onMounted, ref} from 'vue'

export default {
  name: "index3-4",
  setup() {
    const loading = ref(true)
    const multipleTableRef = ref('')
    const multipleSelection = ref('')
    const tableData = ref([])
    const options = ref([
      {
        prop: 'ID',
        label: '镜像ID'
      },
      {
        prop: 'Tag',
        label: '版本号'
      },
      {
        prop: 'Repository',
        label: '镜像名称'
      },
      {
        prop: 'actions',
        label: '操作'
      }
    ])

    function getImageInfo() {
      tableData.value = []
      Docker_Image().then(res => {
        const {data} = res
        data.docker_images.forEach(item =>{
          tableData.value.push(item)
        })
        loading.value = false
      })
    }

    function handleSelectionChange(val) {
      multipleSelection.value = val
      console.log(val)
    }

    onMounted(()=>{
      getImageInfo()
    })
    return {
      tableData,
      options,
      multipleTableRef,
      loading,
      handleSelectionChange
    }
  }
}
</script>

<style scoped>

</style>