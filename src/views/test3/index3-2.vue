<template>
  <!--    添加蜜罐的第一个对话框-->
  <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%">
    <div>
      <el-row>

        <el-col :span="6" style="padding-top: 4px">
          <span>请选择蜜罐文件: </span>
        </el-col>

        <el-col :span="6" :offset="1">
          <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-icon :size="18">
              <upload-filled/>
            </el-icon>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm1">确定</el-button>
        </span>
    </template>
  </el-dialog>


  <!--    添加蜜罐的第二个对话框-->
  <el-dialog
      v-model="dialogVisible1"
      title="详情"
      width="25%"
  >
    <el-form ref="addHoneyFormRef" :model="form" label-width="80px">

      <el-form-item label="名称:" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="类型:" prop="type">
        <el-input v-model="form.type"/>
      </el-form-item>

      <el-form-item label="版本号:" prop="version">
        <el-input v-model="form.version"/>
      </el-form-item>

      <el-form-item label="说明:" prop="description">
        <el-input v-model="form.description"
                  :autosize="{minRows:2,maxRows:4}"
                  type="textarea"
        />
      </el-form-item>

    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel2">Cancel</el-button>
          <el-button type="primary" @click="confirm2">Confirm</el-button>
        </span>
    </template>
  </el-dialog>


  <!--  删除蜜罐对话框-->
  <el-dialog
      v-model="dialogVisible2"
      title="删除提醒"
      width="30%">
    <span>确定删除此蜜罐吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="delete_One_Confirm"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-row style="padding-bottom: 10px;justify-content: flex-end">
    <el-button type="primary" icon="plus" @click="addHoney($event)">
      添加蜜罐
    </el-button>


    <el-button type="danger" icon="delete" @click="deleteHoney($event)">
      删除蜜罐
    </el-button>
  </el-row>


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
          <template v-if="scope.row.status === false">
            <el-link type="success" @click="StartContainer(scope.row)">开启</el-link>
          </template>
          <template v-else-if="scope.row.status === true">
            <el-link type="warning" @click="CloseContainer(scope.row)">关闭</el-link>
          </template>
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
import {onMounted, reactive, ref} from "vue";
import {Click_button} from '../../utils/click-button'
import {ElMessage} from 'element-plus'
import {Docker_Container, Container_Pause, Container_Start, Container_Delete} from "@/api/honey";

export default {
  name: "test3-2",
  setup() {
    const loading = ref(true)
    const addHoneyFormRef = ref()
    const multipleTableRef = ref('')
    const multipleSelection = ref('')
    //表格内容
    const tableData = ref([])

    //表格属性
    const options = ref([
      {
        prop: 'name',
        label: '蜜罐名称'
      },
      {
        prop: 'version',
        label: '版本号'
      },
      // {
      //   prop: 'type',
      //   label: '蜜罐类型'
      // },
      // {
      //   prop: 'description',
      //   label: '蜜罐说明'
      // },
      {
        prop: 'status',
        label: '状态'
      },
      {
        prop: 'actions',
        label: '操作'
      }
    ])


    //添加蜜罐的第二个对话框表单内容
    const form = reactive({
      // select_value: '',   //选择器选择的值，是定义的value值
      name: '',
      type: '',
      version: '',
      status: '',
      description: ''
    })


    //对话框显示
    const dialogVisible = ref(false)
    const dialogVisible1 = ref(false)
    const dialogVisible2 = ref(false)


    //编辑单个蜜罐
    function handleEdit(index, row) {
      console.log(row)
    }

    //==================================================//

    //弹出删除单个蜜罐容器对话框
    const delete_container_id = ref('')
    function handleRemove(index, row) {
      dialogVisible2.value = true
      delete_container_id.value = row.ID
    }
    // 删除单个蜜罐容器
    function delete_One_Confirm() {
      console.log(delete_container_id.value)
      // Container_Delete({container_id: delete_container_id}).then(res => {
      //   const {data} = res
      //   // 删除成功
      //   if(data.status === 'true'){
      //     ElMessage({
      //       type:"success",
      //       message:"删除成功"
      //     })
      //   }
      //   else{
      //     ElMessage({
      //       type:'error',
      //       message:"删除失败"
      //     })
      //   }
      // })
      dialogVisible2.value = false
    }

    //添加蜜罐
    function addHoney(event) {
      Click_button(event)
      dialogVisible.value = true
    }

    //删除选中的蜜罐
    function deleteHoney(event) {
      Click_button(event)
      // console.log(multipleSelection.value)
    }

    // 获得选中的表格项
    function handleSelectionChange(val) {
      multipleSelection.value = val
    }

    function confirm1() {
      dialogVisible.value = false
      dialogVisible1.value = true
    }

    function confirm2() {
      initForm()
      dialogVisible1.value = false
    }

    function cancel2() {
      initForm()
      dialogVisible1.value = false
    }

    //初始化添加蜜罐的第二个对话框
    function initForm() {
      // Object.keys(form).forEach(item => {
      //   form[item] = ''
      // })
      addHoneyFormRef.value.resetFields()
    }


    //禁止修改状态开关
    function beforeChange() {
      return new Promise((_, reject) => {
        return reject
      })
    }

    // 获取蜜罐容器信息
    function getContainerInfo() {
      tableData.value = []
      Docker_Container().then(res => {
        const {data} = res
        data.docker_container.forEach(item => {
          tableData.value.push(item)
        })
        loading.value = false
      })
    }

    // 关闭蜜罐容器(
    function CloseContainer(row) {
      const container_id = row.ID
      loading.value = true
      Container_Pause({container_id: container_id}).then(res => {
        const {data} = res
        // 开启成功
        if (data.status === 'true') {
          ElMessage({
            type: "success",
            message: `${row.name} 蜜罐关闭成功`
          })
          row.status = false
          // loading.value = true
          // getContainerInfo()
        }
        //开启失败
        else {
          ElMessage({
            type: 'error',
            message: `${row.name} 蜜罐关闭失败`
          })
        }
      })
      loading.value = false
    }

    // 开启蜜罐容器
    function StartContainer(row) {
      const container_id = row.ID
      Container_Start({container_id: container_id}).then(res => {
        const {data} = res

        // 开启成功
        if (data.status === 'true') {
          ElMessage({
            type: "success",
            message: `${row.name} 蜜罐开启成功`
          })
          row.status = true
          // loading.value = true
          // getContainerInfo()
        }
        //开启失败
        else {
          ElMessage({
            type: 'error',
            message: `${row.name} 蜜罐开启失败`
          })
        }
      })
      // row.status = true
    }

    onMounted(() => {
      getContainerInfo()
    })

    return {
      multipleTableRef,
      tableData,
      options,
      dialogVisible,
      dialogVisible1,
      dialogVisible2,
      form,
      addHoneyFormRef,
      loading,
      handleEdit,
      handleRemove,
      addHoney,
      deleteHoney,
      confirm1,
      confirm2,
      cancel2,
      beforeChange,
      handleSelectionChange,
      CloseContainer,
      StartContainer,
      delete_One_Confirm,
    }
  }
}
</script>

<style scoped>

</style>