<template>
  <div style="margin-bottom: 10px;background-color: white;padding: 20px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="search" placeholder="请输入报表名称"/>
        </el-col>
        <el-col :span="2" :offset="15">
          <el-button type="primary" icon="Plus" @click="Generate_Report($event)">
            生成报表
          </el-button>
        </el-col>
      </el-row>
  </div>
  <div>
    <el-card shadow="never">
      <el-table :data="report.filter(data=>(search!==''?data.title === search:data ))">
        <el-table-column v-for="(item,index) in form_options" :key="index"
                         :label="item.label" :prop="item.prop">
          <template slot-scope="scope" v-if="item.prop === 'actions'">
            <el-link type="primary" size="small" style="margin-right: 10px">修改</el-link>
            <el-link type="danger" size="small" style="margin-right: 10px">删除</el-link>
            <el-link type="info" size="small">详情</el-link>
          </template>

        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {useRouter} from 'vue-router'
import db from '../../utils/localStorage'
import {Click_button} from '../../utils/click-button'
import moment from 'moment'

export default {
  name: "index7-1",
  setup() {
    const router = useRouter()
    const search = ref('')
    const report = reactive([
      {
        'title': '111',
        'create_time': moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        'author': 'super'
      },
      {
        'title': '222',
        'create_time': moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        'author': 'super'
      }
    ])

    const form = reactive({
      title: null,
      author: null,
      create_name: null
    })

    const form_options = [
      {
        label: '标题',
        prop: 'title'
      },
      {
        label: '创建时间',
        prop: 'create_time'
      },
      {
        label: '创建者',
        prop: 'author'
      },
      {
        label: '操作',
        prop: 'actions'
      }
    ]

    const Generate_Report = function (event) {
      Click_button(event)
      const create_time = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      const author = 'author'

      const report_instance = {
        title: null,
        author: author,
        create_time: create_time,
      }
      db.save('report_instance',report_instance)
      router.push({
        path: '/report_detail'
      })


    }
    return {
      search,
      report,
      form,
      form_options,
      Generate_Report
    }
  }
}
</script>

<style scoped>

</style>