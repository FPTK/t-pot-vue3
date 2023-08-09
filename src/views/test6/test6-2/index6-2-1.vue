<template>
  <el-card class="card">
    <el-row :gutter="50" class="header">
      <el-button type="primary" @click="deleteSever(row)">删除服务器</el-button>
      <el-button type="primary" @click="addSever(row)">添加服务器</el-button>
    </el-row>

    <div style="border: #acdbf7 solid 1px; min-width: 300px; min-height: 300px">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="selection" width="60" label="全选" />
        <el-table-column prop="mailserver" label="邮件服务器" width="180" />
        <el-table-column prop="telNumber" label="收信人" width="180" />
        <el-table-column prop="warnLevel" label="告警等级" width="180" />
        <el-table-column prop="warnInteral" label="告警间隔" width="180" />
        <el-table-column prop="port" label="端口号" width="180" />
        <el-table-column prop="encryption" label="加密方式" width="180" />
        <el-table-column prop="state" label="状态" />

        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="addSever(row)">编辑</el-button>
            <el-button type="text" @click="deleteSever(row)">删除</el-button>
            <el-button type="text">停用</el-button>
          </template></el-table-column
        >
      </el-table>
      <!--分页-->
      <el-pagination
        v-model:currentPage="queryForm.pagenum"
        v-model:page-size="queryForm.pagesize"
        :page-sizes="[10, 20, 50, 100]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="2"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
  <Dialog
    v-model="emailDialogVisible"
    :emailDialogTitle="emailDialogTitle"
    v-if="emailDialogVisible"
    :emailDialogTableValue="emailDialogTableValue"
  />
</template>

<script setup>
import { ref } from "vue";
import Dialog from "./components/emailDialog";
import { ElMessage, ElMessageBox } from "element-plus";
//定义对话框显示与否
const emailDialogVisible = ref(false);
const emailDialogTitle = ref("");
const emailDialogTableValue = ref({});
//定义表格数据
const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 10,
});
//判断服务器数据是否为空
const isNull = (mailserver) => {
  if (!mailserver) return true;
  if (JSON.stringify(mailserver) === "{}") return true;
  if (JSON.stringify(mailserver) === "[]") return true;
};

//新增服务器
const addSever = (row) => {
  if (isNull(row)) {
    emailDialogTitle.value = "添加短信服务器";
    emailDialogTableValue.value = {};
  } else {
    emailDialogTitle.value = "编辑短信服务器";
    emailDialogTableValue.value = JSON.parse(JSON.stringify(row));
  }

  emailDialogVisible.value = true;
};
//删除服务器
const deleteSever = (row) => {
  ElMessageBox.confirm("确定删除", "删除短信服务器", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除完成",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

const tableData = [
  {
    mailserver: "xxxxxxxxx@163.com",
    telNumber: "13402874666",
    warnLevel: "高危",
    warnInteral: "10分钟",
    state: "运行中",
    port: "80",
    encryption: "SSL",
  },
  {
    mailserver: "xxxxxxxxx@163.com",
    telNumber: "15266487569",
    warnLevel: "低危",
    warnInteral: "10分钟",
    state: "未运行",
    port: "80",
    encryption: "SSL",
  },
];
</script>
<style scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
  left: 64.25rem;
}

::v-deep .el-pagination {
  padding-top: 400px;
  box-sizing: border-box;
  text-align: center;
}
</style>
