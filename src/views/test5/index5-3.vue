<template>
  <el-card class="wrapper">
    <el-form inline v-model="searchForm" label-width="100px">
      <el-form-item label="时间">
        <el-date-picker
            v-model="searchForm.timestamp"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled-date="TimeOption"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="源ip">
        <el-input
            class="w-50 m-2"
            placeholder="请输入源ip"
            v-model="searchForm.src_ip"
        />
      </el-form-item>
      <el-form-item label="目的ip">
        <el-input
            class="w-50 m-2"
            placeholder="请输入目的ip"
            v-model="searchForm.dest_ip"
            size="mid"
        />
      </el-form-item>
      <el-form-item label="服务">
        <el-select v-model="searchForm.protocol" placeholder="服务" clearable>
          <el-option
              v-for="item in protocolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="协议">
        <el-select v-model="searchForm.proto" placeholder="协议" clearable>
          <el-option
              v-for="item in protoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="攻击类型">
        <el-select
            v-model="searchForm.category"
            placeholder="请选择攻击类型"
            clearable
        >
          <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="告警级别">
        <el-select
            v-model="searchForm.severity"
            placeholder="请选择告警级别"
            clearable
        >
          <el-option
              v-for="item in severityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-icon
            class="search"
            style="font-size: 24px; cursor: pointer"
            @click="searchTable"
        ><search
        /></el-icon>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" style="float: right">删除</el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
      <el-table-column type="expand" width="40px">
        <template #default="props">
          <div class="commonLayout">
            <el-container>
              <el-aside width="400px" style="font-style: inherit">
                <div style="margin: 20px">
                  <div
                      style="
                      font-size: 15px;
                      width: 100%;
                      height: 15px;
                      margin: 5px 0px;
                    "
                      class="rowClass"
                  >
                    <p class="spanLeft" style="width: 50%; float: left">
                      攻击类型
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.category ? props.row.category : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      告警级别
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.severity ? props.row.severity : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      攻击时间
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.timestamp ? props.row.timestamp : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">源ip</p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.src_ip ? props.row.src_ip : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      源端口
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.src_port ? props.row.src_port : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">协议</p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.proto ? props.row.proto : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">服务</p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.protocol ? props.row.protocol : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      事件详情
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.eventid ? props.row.eventid : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">操作</p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.message ? props.row.message : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      诱捕蜜罐名称
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.type ? props.row.type : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      诱捕蜜罐端口
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.src_port ? props.row.src_port : "null" }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      攻击者操作系统
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{
                        props.row.operateSystem
                            ? props.row.operateSystem
                            : "null"
                      }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      攻击者地理位置
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{
                        props.row.country_name ? props.row.country_name : "null"
                      }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      攻击者经纬度
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{
                        props.row.longitudeandlatitude
                            ? props.row.longitudeandlatitude
                            : "null"
                      }}
                    </p>
                    <p class="spanLeft" style="width: 50%; float: left">
                      攻击者时区
                    </p>
                    <p class="spanRight" style="width: 50%; float: left">
                      {{ props.row.timezone ? props.row.timezone : "null" }}
                    </p>
                  </div>
                </div>
              </el-aside>

              <el-main>
                <el-card height="200px">
                  <div class="playBackMain" ref="videoDom">
                    {{ aaa }}
                  </div>
                </el-card>
                <el-button-group class="ml-4">
                  <el-button type="primary"
                  ><el-icon><d-arrow-left /></el-icon
                  ></el-button>
                  <el-button type="primary" @click="playBackVideo(props.row)">
                    <el-icon><caret-right /></el-icon>
                  </el-button>
                  <el-button type="primary">
                    <el-icon><d-arrow-right /></el-icon>
                  </el-button>
                </el-button-group>
              </el-main>
            </el-container>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="selection" label="全选" />
      <el-table-column prop="timestamp" label="日志时间" show-overflow-tooltip>
        <template #default="{ row }">
          <span>{{
              row.timestamp
                  ? new Date(row.timestamp).toISOString().split("T")[0] +
                  " " +
                  new Date(row.timestamp)
                      .toISOString()
                      .split("T")[1]
                      .split(".")[0]
                  : "null"
            }}</span>
          <!-- .toISOString().split('T') -->
        </template>
      </el-table-column>
      <el-table-column prop="src_ip" label="源ip" show-overflow-tooltip>
        <template #default="{ row }">
          {{ row.src_ip ?? "null" }}
        </template>
      </el-table-column>
      <el-table-column prop="dest_ip" label="目的ip" show-overflow-tooltip>
        <template #default="{ row }">
          {{ row.dest_ip ?? "null" }}
        </template>
      </el-table-column>
      <el-table-column prop="proto" label="服务" show-overflow-tooltip>
        <template #default="{ row }">
          {{ row.proto ?? "null" }}
        </template>
      </el-table-column>
      <el-table-column prop="protocol" label="协议" show-overflow-tooltip>
        <template #default="{ row }">
          {{ row.protocol ?? "null" }}
        </template>
      </el-table-column>
      <el-table-column prop="category" label="攻击类别" show-overflow-tooltip>
        <template #default="{ row }">
          {{ row.category ?? "null" }}
        </template>
      </el-table-column>
      <el-table-column prop="severity" label="告警级别" show-overflow-tooltip>
        <template #default="{ row }">
          {{ row.severity ?? "null" }}
        </template>
      </el-table-column>
      <!--删除按钮-->
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
              class="deletebutton"
              color="#626aef"
              type="text"
              @click="deleteSever(row)"
          >删除</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <!--分页-->
    <el-pagination
        v-model:currentPage="searchForm.pagenum"
        v-model:page-size="searchForm.pagesize"
        :page-sizes="[10, 20, 50, 100]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataSource.length"
    />
  </el-card>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

import { ElMessage, ElMessageBox } from "element-plus";

import axios from "axios";
const aaa = ref("攻击回放待播放...");
// 查询表单
const searchForm = reactive({
  timestamp: null,
  src_ip: "",
  dest_ip: "",
  protocol: "",
  proto: "",
  category: "",
  severity: "",
  pagenum: 1,
  pagesize: 20,
});
//攻击回放
const playBackVideo = (row) => {
  //可以打印，下一步如和
  aaa.value = '[admin@ultimateagency"~]:$ ' + "null";
  //videoDom.innerHTML = "";
  // '[admin@ultimateagency"~]:$ ' + row.warnInteral;
  //videoDom.innerHTML = '[admin@ultimateagency"~]:$ ';
  ElMessage({
    message: "播放完成",
    type: "success",
  });
};

//确保直到今天;
const TimeOption = (time) => {
  return time.getTime() > Date.now();
};
// 表格数据
const tableData = computed(() =>
    dataSource.value.slice(
        (searchForm.pagenum - 1) * searchForm.pagesize,
        searchForm.pagenum * searchForm.pagesize - 1
    )
);
const dataSource = ref([]);
const loading = ref(false);
// 查询表格
const searchTable = () => {
  console.log(searchForm, 222);
  searchForm.pagenum = 1;
  axios.get("/return.json").then((res) => {
    dataSource.value = res.data.reduce((pre, item) => {
      const {
        timestamp,
        src_ip,
        dest_ip,
        protocol,
        proto,
        category,
        severity,
      } = searchForm;
      if (item._source["@timestamp"]) {
        item._source["timestamp"] = item._source["@timestamp"];
      }
      if (timestamp) {
        const startTime = new Date(timestamp[0]).getTime();
        const endTime = new Date(timestamp[1]).getTime();
        const time = item._source.timestamp
            ? new Date(item._source.timestamp).getTime()
            : 0;

        if (startTime > time || endTime < time) {
          return pre;
        }
      }
      if (
          !!src_ip &&
          (!item._source.src_ip || !item._source.src_ip.includes(src_ip))
      ) {
        return pre;
      }
      if (
          !!dest_ip &&
          (!item._source.dest_ip || !item._source.dest_ip.includes(dest_ip))
      ) {
        return pre;
      }
      if (
          !!protocol &&
          (!item._source.protocol || !item._source.protocol.includes(protocol))
      ) {
        return pre;
      }
      if (
          !!proto &&
          (!item._source.proto || !item._source.proto.includes(proto))
      ) {
        return pre;
      }
      if (
          !!category &&
          (!item._source.category || !item._source.category.includes(category))
      ) {
        return pre;
      }
      if (
          !!severity &&
          (!item._source.severity || !item._source.severity.includes(severity))
      ) {
        return pre;
      }
      pre.push(item._source);
      return pre;
    }, []);
  });
};
searchTable();
// 服务下拉选项
const protocolOptions = [
  {
    value: "adb",
    label: "adb",
  },
  {
    value: "ftp",
    label: "ftp",
  },
  {
    value: "http",
    label: "http",
  },
  {
    value: "https",
    label: "https",
  },
  {
    value: "intelamt",
    label: "intelamt",
  },
  {
    value: "mssql",
    label: "mssql",
  },
  {
    value: "mysql",
    label: "mysql",
  },
  {
    value: "pop3",
    label: "pop3",
  },
  {
    value: "postgresql",
    label: "postgresql",
  },
  {
    value: "rdp",
    label: "rdp",
  },
  {
    value: "redis",
    label: "redis",
  },
  {
    value: "sip",
    label: "sip",
  },
  {
    value: "smb",
    label: "smb",
  },
  {
    value: "smtp",
    label: "smtp",
  },
  {
    value: "socks",
    label: "socks",
  },
  {
    value: "ssh",
    label: "ssh",
  },
  {
    value: "telnet",
    label: "telnet",
  },
  {
    value: "vnc",
    label: "vnc",
  },
];
// 协议
const protoOptions = [
  {
    value: "tcp",
    label: "tcp",
  },
  {
    value: "httpd",
    label: "httpd",
  },
  {
    value: "IPv6-ICMP",
    label: "IPv6-ICMP",
  },
  {
    value: "ftpd",
    label: "ftpd",
  },
];
// 攻击类型
const categoryOptions = [
  {
    value: "brute_force",
    label: "暴力破解",
  },
  {
    value: "suspicious_connection",
    label: "可疑连接",
  },
  {
    value: "abnormal_behavior",
    label: "异常行为",
  },
];
// 告警级别
const severityOptions = [
  {
    value: "low",
    label: "低危",
  },
  {
    value: "mid",
    label: "中危",
  },
  {
    value: "high",
    label: "高危",
  },
];
</script>

<style scoped lang="scss">
.wrapper {
  height: calc(100% - 40px);
  overflow-y: auto;
  .el-form-item {
    width: 320px;
  }
  .el-select {
    width: 100%;
  }
}

::v-deep .playBackMain {
  background-color: black;
  height: 400px;
  color: white;
}
</style>
