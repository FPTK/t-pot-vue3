<template>

  <el-dialog
      v-model="dialogVisible"
      title="详情"
      width="25%"
  >
    <el-form ref="addUserTableRef" :model="form" :rules="rules" label-width="80px">

      <el-form-item label="角色:" prop="role">
        <el-select v-model="form.role">
          <el-option v-for="item in select_option"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名:" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="form.password" show-password/>
      </el-form-item>

      <el-form-item label="确认密码:" prop="confirm">
        <el-input type="password" v-model="form.confirm" show-password></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">Cancle</el-button>
          <el-button type="primary" @click="confirm">Confirm</el-button>
        </span>
    </template>
  </el-dialog>


  <el-row style="padding-bottom: 10px;justify-content: flex-end">
    <el-button type="primary" icon="plus" @click="addUser($event)">
      添加用户
    </el-button>


    <!--    <el-button type="danger" icon="delete" @click="deleteUser($event)">-->
    <!--      删除用户-->
    <!--    </el-button>-->
  </el-row>
  <el-card>
    <el-table
        ref="multipleTableRef"
        style="width:100%"
        :data="tableData"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-for="(item,index) in options" :prop="item.prop" :label="item.label" :key="index">

        <template #default="scope" v-if="item.prop === 'actions'">
          <el-link type="info" @click="handleEdit($event,scope.$index,scope.row)" style="margin-right: 10px">编辑
          </el-link>
          <el-link type="danger" @click="handleRemove($event,scope.$index,scope.row)" style="margin-right: 10px">删除
          </el-link>
          <template v-if="scope.row.status === false">
            <el-link type="success">开启</el-link>
          </template>
          <template v-else-if="scope.row.status === true">
            <el-link type="warning">关闭</el-link>
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

import {reactive, ref} from "vue";
import moment from 'moment'
import {Click_button} from "@/utils/click-button";

export default {
  name: "index6-3",
  setup() {


    const addUserTableRef = ref()
    const multipleTableRef = ref('')
    const multipleSelection = ref('')

    const dialogVisible = ref(false)
    //添加蜜罐的第二个对话框表单内容
    const form = reactive({
      role: '',   //选择器选择的值，是定义的value值
      // role: '',
      name: '',
      password: '',
      confirm: '',
    })

    //表格内容
    const tableData = ref([
      {
        "name": "admin",
        "role": "管理员",
        "create-time": moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        "last-time": moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        "status": false,
      },
      {
        "name": "audit",
        "role": "审计员",
        "create-time": moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        "last-time": moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        "status": true,
      }
    ])
    //表格属性
    const options = ref([
      {
        prop: 'name',
        label: '用户名'
      },
      {
        prop: 'role',
        label: '角色'
      }, {
        prop: 'create-time',
        label: '创建日期'
      },
      {
        prop: 'last-time',
        label: '最后登录时间'
      },
      {
        prop: 'status',
        label: '状态'
      },
      {
        prop: 'actions',
        label: '操作'
      }
    ])

    // 选择角色
    const select_option = [
      {
        value: 'admin',
        label: '管理员'
      },
      {
        value: 'audit',
        label: '审计员'
      }, {
        value: 'superman',
        label: '普通用户'
      },
    ]

    //添加用户功能
    function addUser(event) {
      Click_button(event)
      dialogVisible.value = true
    }

    //提交表单内容
    function confirm() {
      console.log(addUserTableRef.value.validate)
      addUserTableRef.value.validate((valid) => {
        if (valid) {
          console.log(form)
          initForm()
          dialogVisible.value = false
        }
      })
    }

    //表单取消
    function cancel() {
      initForm()
      dialogVisible.value = false
    }

    // 自定义校验规则
    const rules = reactive({
      password: [
        {
          validator: validatePass,
          trigger: 'blur'
        }
      ],
      confirm: [
        {
          validator: validateConfirm,
          trigger: 'blur'
        }
      ]
    })

    // 验证规则不能使用const xxx = () =>{}
    function validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        // if (form.password !== '') {
        //   if (!addUserTableRef.value) return
        //   addUserTableRef.value.validateField('password', () => null)
        // }
        callback()
      }
    }

    function validateConfirm(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== form.password) {
        callback(new Error("两次密码不匹配!"))
      } else {
        callback()
      }
    }


    //初始话添加蜜罐的第二个对话框
    function initForm() {
      // Object.keys(form).forEach(item => {
      //   form[item] = ''
      // })
      addUserTableRef.value.resetFields()
    }

    //编辑单个用户
    function handleEdit(index, row) {
      console.log(row)
    }

    //删除单个用户
    function handleRemove(index, row) {
      dialogVisible2.value = true
    }


    //获取选中的用户
    function handleSelectionChange(val) {
      multipleSelection.value = val
      console.log(val)
    }

    //禁止修改状态开关
    function beforeChange() {
      return new Promise((_, reject) => {
        // ElMessage.error('Switch failed')
        // return reject(new Error('Error'))
        return reject
      })
    }


    return {
      multipleTableRef,
      tableData,
      options,
      form,
      dialogVisible,
      addUserTableRef,
      rules,
      select_option,
      beforeChange,
      handleRemove,
      handleEdit,
      handleSelectionChange,
      addUser,
      confirm,
      cancel,
    }

  }
}
</script>

<style scoped>

</style>