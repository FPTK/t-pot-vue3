<template>
  <div style="width: 50%;margin: auto;">
    <div style="background-color: white;padding:2% 0 2% 10%">
      <el-form :data="Form_data">
        <el-form-item label="标题:">
          <el-input v-model="Form_data.title" placeholder="请输入标题" style="width: 30%"/>
        </el-form-item>

        <el-form-item label="时间:">
          <el-radio-group v-model="Form_data.time" @change="select_time_range">
            <el-radio label="all">全部</el-radio>
            <el-radio :label="3">近三个月</el-radio>
            <el-radio :label="6">近六个月</el-radio>
            <el-radio :label="12">近12个月</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>

          <el-date-picker
              v-model="value1.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :disabled-date="disabledDate"
          ></el-date-picker>


          <div style="margin-left: 5px">
            <el-button type="text" icon="view" size="small" @click="view">预览
            </el-button>
            <el-button type="text" icon="download" size="small" @click="save">保存
            </el-button>
            <el-button type="text" icon="close" size="small" @click="close">取消
            </el-button>
          </div>

        </el-form-item>

      </el-form>
    </div>

    <div style="margin-top: 10px;background-color: white;padding:5%">
      <div style="text-align: center;line-height: 2">
        <p style="font-size: 35px;font-weight: bolder;">统计报表</p>
        <p>
          {{ content.time[0] }} 至 {{ content.time[1] }}</p>
      </div>

      <div style="line-height: 2.5">
        <p style="font-size: 25px;font-weight: bolder">系统运行统计</p>
        <p>截止到目前为止，系统已经运行
          <span style="color:#45b97c;font-weight: bolder;font-size: 28px;margin:0 2px 0 2px">
                            {{ content.System_operation.running_days }}天</span>，共发现<span
              style="color:#b3424a;font-weight: bolder;font-size: 28px;margin:0 2px 0 2px">
                        {{ content.attack_total_number }}次</span>入侵攻击。</p>
      </div>

      <div style="line-height: 2.5">
        <p style="font-size: 25px;font-weight: bolder">攻击类型方向统计</p>
        <!--                   text-indent 设置首行缩进-->
        <p style="text-indent: 50px">
          在本次的<span
            style="color:#b3424a;font-weight: bolder;font-size: 28px;margin:0 2px 0 2px">{{
            content.attack_total_number
          }}</span>次
          入侵攻击中，共发现可疑连接{{ content.Attack_type_direction.suspicious_connection.number }}次，
          占比{{
            content.Attack_type_direction.suspicious_connection.percent
          }},，暴力破解{{
            content.Attack_type_direction.brute_force.number
          }}次，占比{{ content.Attack_type_direction.brute_force.percent }}，异常行为
          {{
            content.Attack_type_direction.abnormal_behavior.number
          }}次，占比{{ content.Attack_type_direction.abnormal_behavior.percent }}，其中
          <span style="color:#b3424a;font-weight: bolder;font-size: 28px;margin:0 2px 0 2px ">
                            {{ content.Attack_type_direction.max_number_cn_name }}</span>攻击类型次数最多，详情如下:
        </p>
        <div style="display: inline-block">
          <div id="pie_chart" style="width:300px;height:300px"></div>
        </div>
        <div style="display: inline-block">
          <div id="radar_chart" style="width:350px;height:300px"></div>
        </div>
      </div>
    </div>

    <div style="margin-top: 10px;background-color: white;padding:5%">
      <div style="line-height: 2.5">
        <p style="font-size: 25px;font-weight: bolder">攻击级别统计</p>
        <p style="text-indent: 50px">
          在本次统计得<span
            style="color:#b3424a;font-weight: bolder;font-size: 28px;margin:0 2px 0 2px">{{
            content.attack_total_number
          }}</span>次入侵攻击中，
          低危攻击{{ content.Attack_level.low.number }}次，占比{{
            content.Attack_level.low.percent
          }},中危攻击{{ content.Attack_level.mid.number }}次，
          占比{{ content.Attack_level.mid.percent }}，高危攻击{{
            content.Attack_level.high.number
          }}次，占比{{ content.Attack_level.high.percent }}，其中
          <span
              style="color:#b3424a;font-weight: bolder;font-size: 28px;margin:0 2px 0 2px">{{
              content.Attack_level.max_number_level_cn_name
            }}</span>攻击行为
          次数最多，详情如下：
        </p>
        <div style="display: inline-block;margin: 10px 0 0 150px">
          <div id="funnel_chart" style="width:500px;height:400px;"></div>
        </div>
      </div>
      <div style="line-height: 2.5">
        <p style="font-size: 25px;font-weight: bolder">攻击IP TOP10</p>
        <p style="text-indent: 50px">
          在本次统计IP统计中，IP地址为<span
            style="color:#b3424a;font-weight: bolder;font-size: 28px;margin:0 2px 0 2px">{{
            content.Attack_ip.max_number_ip
          }}</span>发动的攻击次数最多，
          按照攻击次数排名整理top10数据，详情如下：
        </p>
        <div style="display: inline-block">
          <div id="bar_chart_1" style="width:600px;height:400px;"></div>
        </div>
      </div>
    </div>

    <div style="margin-top: 10px;background-color: white;padding:5%">
      <div style="line-height: 2.5">
        <p style="font-size: 25px;font-weight: bolder">攻击服务 TOP10</p>
        <p style="text-indent: 50px">
          在本次统计中共有<span
            style="color:#b3424a;font-weight: bolder;font-size: 28px;margin:0 2px 0 2px">{{
            content.Attack_service.number
          }}</span>种服务，其中<span
            style="color:#b3424a;font-weight: bolder;font-size: 28px;margin:0 2px 0 2px">
                    {{ content.Attack_service.max_number_service }}</span>服务攻击次数最高，被攻击次数按排名整理top10数据，详情如下：
        </p>
        <div style="display: inline-block">
          <div id="bar_chart_2" style="width:600px;height:400px;"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>  
import db from '../../../utils/localStorage'
import moment from 'moment'

import {GetReportInfo} from "@/api/system";
import {onMounted, reactive, getCurrentInstance, watch} from "vue";
import {ElMessage} from 'element-plus'

export default {
  name: "report_detail",
  setup() {

    const {proxy} = getCurrentInstance()
    console.log(db.get('report_instance'))

    // 表表的主题和时间
    const Form_data = reactive({
      title: '',
      time: null
    })

    // 攻击方向分类
    const attack_type_direction = ["brute_force", "suspicious_connection", "abnormal_behavior"]

    // 攻击等级分类
    const attack_level = ["high", "mid", "low"]
    // 报表的初始内容
    let content = reactive({
      attack_total_number: 9999,
      time: ["2021-01-01", "2021-03-03"],
      System_operation: {
        running_days: 84
      },
      Attack_type_direction: {
        brute_force: {
          cn_name: "暴力破解",
          number: 3333,
          percent: "33.33%"
        },
        suspicious_connection: {
          cn_name: "可疑连接",
          number: 3333,
          percent: "33.33%"
        },
        abnormal_behavior: {
          cn_name: "异常行为",
          number: 3333,
          percent: "33.33%"
        },
        max_number_cn_name: "可疑连接"
      },
      Attack_level: {
        high: {
          number: 3333,
          cn_name: "高危",
          percent: '33.33%'
        },
        mid: {
          number: 3333,
          cn_name: "中危",
          percent: '33.33%'
        },
        low: {
          number: 3333,
          cn_name: "低危",
          percent: '33.34%'
        },
        max_number_level_cn_name: "低危"
      },
      Attack_ip: {
        Attack_ip_total_rank: {
          '192.168.4.121': 50,
          '192.168.4.197': 25,
          '192.168.4.183': 10,
          '192.168.4.151': 5
        },
        max_number_ip: '192.168.4.121'
      },
      Attack_service: {
        number: 10,
        service_rank: {
          'ssh': 24, 'ftp': 18, 'smb': 10, 'postgresql': 8, 'mssql': 6, 'mysql': 6, 'socks': 6,
          'adb': 4, 'rdp': 2, 'telnet': 2
        },
        max_number_service: 'ssh'
      }
    })

    // 设置禁止时间
    const disabledDate = (time) => {
      return time.getTime() < new Date("2022-01-20").getTime() ||
          time.getTime() > new Date().getTime()
    }

    // 日期选择器选中的时间显示
    const value1 = reactive({
      'time': []
    })


    const select_time_range = () => {
      let start = new Date()
      const end = new Date()
      const time = new Date("2022-01-20")
      //如果时间选择的是全部，给value1的第二个参数设置均设置all
      if (Form_data.time === "all") {
        value1.time[0] = 'all'
        value1.time[1] = 'all'

      } else {
        let day = 0
        switch (Form_data.time) {
          case 3:
            day = 90
            break
          case 6:
            day = 180
            break
          case 12:
            day = 365
            break
        }
        start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
        if (start.getTime() < time.getTime())
          start = time


        value1.time[0] = start
        value1.time[1] = end
        console.log(value1)
        // 使用set来手动设置时间框显示时间(vue2.x需要)
        // $set(value1, 0, start)
        // $set(value1, 1, end)
      }
    }


    // 点击预览后要执行的事件
    const view = () => {
      if (value1.time.length === 0) {
        ElMessage({
          showClose: true,
          message: '请输入要查询的的时间',
          type: 'error'
        });
      } else {
        let time;
        //点击view后，如果此时value的第二个参数为all,即选择的是全部时间
        if (value1.time[0] === 'all') {
          time = value1
        } else {
          //如果选择的不是全部时间，那么将时间进行格式化
          time = value1.time.map(element => {
            return moment(element).format("YYYY-MM-DD")
          })
        }
        GetReportInfo({time: time}).then(res => {
          // console.log(res, '########');
          const response = res.data
          Object.keys(content).forEach(item => {
            content[item] = response[item]
          })

        })
      }
    }


    watch(content,
        () => {
          refreshPieChart()
          refreshRadarChart()
          refreshFunnelChart()
          refreshBarChart1()
          refreshBarChart2()
        },
        {deep: true})


    const save = () => {

    }

    const close = () => {

    }

    // 饼图配置项
    const piechart = reactive({
      pie: '',
      pie_option: {
        color: ["#fdb933", "#2585a6", "#b64533"],
        legend: {
          orient: 'horizontal',
          left: 'center',
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: [],
            label: {
              show: true,
              position: 'inner',
              formatter: '{d}%',
              fontStyle: 'italic'
            }
          },
        ]
      }
    })
    const initPieChart = () => {
      piechart.pie = proxy.$echarts.init(document.getElementById('pie_chart'))
      refreshPieChart()
      window.addEventListener('resize', piechart.pie.resize)
    }
    const refreshPieChart = () => {
      piechart.pie_option.series[0].data = []
      attack_type_direction.forEach(key => {
        piechart.pie_option.series[0].data.push(
            {
              name: content.Attack_type_direction[key].cn_name,
              value: content.Attack_type_direction[key].number
            }
        )
      })
      piechart.pie.setOption(piechart.pie_option)
    }

    // 雷达图配置项
    const radarchart = reactive({
      radar: '',
      radar_option: {
        tooltip: {
          trigger: 'item'
        },
        radar: {
          indicator: [
            {
              name: '暴力破解',
              max: 4000,
            },
            {
              name: '可疑连接',
              max: 4000,
            },
            {
              name: '异常行为',
              max: 4000
            },
          ]
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [],
                name: "攻击次数"
              }
            ],
          }
        ]
      },
    })
    const initRadarChart = () => {
      radarchart.radar = proxy.$echarts.init(document.getElementById('radar_chart'))
      refreshRadarChart()
      window.addEventListener('resize', radarchart.radar.resize)
    }
    const refreshRadarChart = () => {
      radarchart.radar_option.series[0].data[0].value = []
      attack_type_direction.forEach(key => {
        radarchart.radar_option.series[0].data[0].value.push(content.Attack_type_direction[key].number)
      })

      radarchart.radar_option.radar.indicator.forEach(item => {
        attack_type_direction.forEach(key => {
          if (item.name === content.Attack_type_direction[key].cn_name) {
            item.max = content.Attack_type_direction[key].number + 100
          }
        })
      })
      radarchart.radar.setOption(radarchart.radar_option)
    }

    // 漏斗图配置项
    const funnelchart = reactive({
      funnel: '',
      funnel_option: {
        //颜色的顺序取决于series.data中的数据输入顺序
        color: ["#b64533", "#fdb933", "#2585a6"],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        legend: {
          data: ['低危', '中危', '高危']
        },
        series: [
          {
            name: "攻击等级",
            type: "funnel",

            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: "inside"
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 15,
                position: "inside",
                formatter: '{b}: {c}%'
              }
            },
            data: []
          }
        ]
      },
    })
    const initFunnelChart = () => {
      funnelchart.funnel = proxy.$echarts.init(document.getElementById('funnel_chart'))
      refreshFunnelChart()
      window.addEventListener('resize', funnelchart.funnel.resize)

    }
    const refreshFunnelChart = () => {
      funnelchart.funnel_option.series[0].data = []
      attack_level.forEach(key => {
        funnelchart.funnel_option.series[0].data.push(
            {
              name: content.Attack_level[key].cn_name,
              value: content.Attack_level[key].percent.split("%")[0]
            }
        )
      })
      funnelchart.funnel.setOption(funnelchart.funnel_option)
    }


    // 第一个饼状图配置项
    const barchart1 = reactive({
      bar1: '',
      bar1_option: {
        color: ["#b3424a"],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          // right: '4%',
          // bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          //坐标从下往上，数量从下往上递增
          data: []
        },
        series: [
          {
            // barWidth:20,
            // barMinWidth:10,
            barMaxWidth: 25,
            type: 'bar',
            data: [],
            label: {
              position: "right",
              show: true,
              fontWeight: "bold"
            },
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      },
    })
    const initBarChart1 = () => {
      barchart1.bar1 = proxy.$echarts.init(document.getElementById('bar_chart_1'))

      refreshBarChart1()
      window.addEventListener('resize', barchart1.bar1.resize)
    }
    const refreshBarChart1 = () => {
      barchart1.bar1_option.yAxis.data = []
      barchart1.bar1_option.series[0].data = []
      const keys = Object.keys(content.Attack_ip.Attack_ip_total_rank).reverse()
      keys.forEach(key => {
        barchart1.bar1_option.yAxis.data.push(key)
        barchart1.bar1_option.series[0].data.push(content.Attack_ip.Attack_ip_total_rank[key])
      })
      barchart1.bar1.setOption(barchart1.bar1_option)
    }

    // 第二个饼状图配置项
    const barchart2 = reactive({
      bar2: '',
      bar2_option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          // right: '4%',
          // bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          //坐标从下往上，数量从下往上递增
          data: []
        },
        series: [
          {
            barMaxWidth: 25,
            type: 'bar',
            data: [],
            label: {
              position: "right",
              show: true,
              fontWeight: "bold"
            },
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      },
    })
    const initBarChart2 = () => {
      barchart2.bar2 = proxy.$echarts.init(document.getElementById('bar_chart_2'))

      refreshBarChart2()
      window.addEventListener('resize', barchart2.bar2.resize)
    }
    const refreshBarChart2 = () => {
      barchart2.bar2_option.yAxis.data = []
      barchart2.bar2_option.series[0].data = []
      const keys = Object.keys(content.Attack_service.service_rank).reverse()
      keys.forEach(key => {
        barchart2.bar2_option.yAxis.data.push(key)
        barchart2.bar2_option.series[0].data.push(content.Attack_service.service_rank[key])
      })
      barchart2.bar2.setOption(barchart2.bar2_option)
    }

    onMounted(() => {
      initPieChart()
      initRadarChart()
      initFunnelChart()
      initBarChart1()
      initBarChart2()
    })
    return {
      Form_data,
      value1,
      content,
      disabledDate,
      select_time_range,
      view,
      save,
      close
    }
  }
}
</script>

<style lang="scss" scoped>

</style>