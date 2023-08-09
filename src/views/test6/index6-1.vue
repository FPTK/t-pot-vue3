<template>
  <div style="border:2px solid #0FD5DC ">

    <div style="display: flex;flex-direction: column">


      <div style="border:1px solid gray;display: flex;justify-content: space-between">
        <div style="display: flex">
          <div style="display: flex;flex-direction: column;align-items: center;padding: 5px">
            <svg-icon name="etherneton" size="48"/>
            <span>eth0</span>
          </div>

          <div style="display: flex;flex-direction: column;align-items: center;padding: 5px">
            <svg-icon name="ethernetoff" size="48"/>
            <span>eth1</span>
          </div>
        </div>
        <div style="display: flex;padding: 10px;align-items: center">
          <div style="font-size: 30px;margin-right: 5px">
            <span>{{ System_time.time2 }}</span>
          </div>
          <div style="display: flex;flex-direction: column">
            <span style="font-size: 20px;margin-bottom: 3px">{{ System_time.weekday }}</span>
            <span>{{ System_time.time1 }}</span>
          </div>
        </div>
      </div>

      <div style="border: 1px solid gray;display: flex;margin-top: 10px">

        <div style="width:30%;display: flex;flex-direction: row;align-items: center;padding: 15px">
          <cpu theme="outline" size="35" fill="#333" :strokeWidth="3"/>
          <span>cpu:</span>
          <el-progress :percentage="Cpu_percentage" :color="customColorMethod" style="width:65%"/>
        </div>
        <div style="width:30%;display: flex;flex-direction: row;align-items: center;padding: 15px">
          <svg-icon name="memory" size="35"/>
          <span>内存:</span>
          <el-progress :percentage="Memory_percentage" :color="customColorMethod" style="width:65%"/>
        </div>
        <div style="width:30%;display: flex;flex-direction: row;align-items: center;padding: 15px">
          <disk theme="outline" size="35" fill="#333" :strokeWidth="3"/>
          <span>磁盘:</span>
          <el-progress :percentage="Disk_percentage" :color="customColorMethod" style="width:65%"/>
        </div>
      </div>

      <div style="border: 1px solid gray;margin-top: 10px;display: flex;">

        <div style="display: flex;align-items: center;width: 30%">
          <div id="gauge" style="width: 190px;height: 150px"/>
          <div style="display: flex;flex-direction: column;line-height: 25px">
            <span>已运行：{{ Honey_status.running }}</span>
            <span>未运行：{{ Honey_status.stopped }}</span>
            <span>总数：{{ Honey_status.count }}</span>
          </div>
        </div>

        <div style="display: flex;align-items: center;width: 30%">
          <div id="gauge1" style="width: 190px;height: 150px"/>
          <div style="display: flex;flex-direction: column;line-height: 25px">
            <span>已运行：1</span>
            <span>未运行：2</span>
            <span>总数：3</span>
          </div>
        </div>

        <div style="display: flex;align-items: center;width: 30%">
          <div id="gauge2" style="width: 190px;height: 150px"/>
          <div style="display: flex;flex-direction: column;line-height: 25px">
            <span>已运行：1</span>
            <span>未运行：2</span>
            <span>总数：3</span>
          </div>
        </div>

      </div>
    </div>

    <div style="display: flex;justify-content: center">
      <div
          style="display: flex;flex-direction: column;align-items: center;margin-top: 20px;border:2px solid gray;padding: 10px;width: 55%">
        <span style="font-size: 20px;margin-bottom: 5px">网卡实时流量图</span>
        <div id="line" style="width: 100%;height: 500px;border-top:1px solid black">
        </div>
      </div>

      <div
          style="display: flex;flex-direction: column;align-items: center;margin-top: 20px;margin-left: 5px;border:2px solid gray;padding: 10px;width: 35%">
        <span style="font-size: 20px;padding-bottom: 5px;">系统日志</span>
        <el-table :data="tableData" style="border-top:1px solid black">
          <el-table-column prop="date" label="日志时间"/>
          <el-table-column prop="content" label="日志内容"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive, getCurrentInstance, onMounted, watch, toRaw} from "vue";
import {getHistoryData, getNowData, getData} from "@/api/getecharsData";
import {GetSystemTime, GetSystemInfo_1, GetDiskInfo} from "@/api/system";
import {Container_Count} from "@/api/honey";
import moment from 'moment'

export default {
  name: "index6-1",
  setup() {
    moment.suppressDeprecationWarnings = true
    //获取this实例
    const {proxy} = getCurrentInstance()


    /**
     * 服务器时间
     * @type {UnwrapNestedRefs<{time1: string, time2: string, weekday: string}>}
     * time1: 年-月-日
     * time2: 时:分:秒
     * weekday:周几
     */
    const System_time = reactive({
      weekday: '',
      time1: '',
      time2: ''
    })


    // CPU占用率
    const Cpu_percentage = ref()

    //内存占用率
    const Memory_percentage = ref()

    //磁盘占用率
    const Disk_percentage = ref()

    //控制el-progress的变色
    const customColorMethod = (percentage) => {
      if (percentage < 40) {
        return '#67c23a'
      }
      if (percentage < 70) {
        return '#e6a23c'
      }
      return '#E05858'
    }

    //系统日志数据
    const tableData = [
      {
        'date': '2022-12-23 09:00:06',
        'content': '用户小六登录系统'
      },
      {
        'date': '2022-12-23 09:00:06',
        'content': '用户小六登录系统'
      },
      {
        'date': '2022-12-23 09:00:06',
        'content': '用户小六登录系统'
      },
      {
        'date': '2022-12-23 09:00:06',
        'content': '用户小六登录系统'
      },
      {
        'date': '2022-12-23 09:00:06',
        'content': '用户小六登录系统'
      },
      {
        'date': '2022-12-23 09:00:06',
        'content': '用户小六登录系统'
      },

    ]

    // 十分钟之后的时间
    let time_last

    // 图标实例化
    let mychart

    //流量数据
    const data = reactive([])

    //先初始化前10分钟，使折线图先表示出来
    function initData() {
      // time应该是从后台获取的系统的时间
      const time = new Date()
      for (let i = 0; i <= 10; i++) {
        const time_add_minute = moment(time).add(i, 'minutes').format("YYYY/MM/DD HH:mm")
        data.push({
          value: [
            time_add_minute, null
          ]
        })
        if (i === 10) {
          time_last = time_add_minute
        }
      }
    }

    //获取time对应的前十分钟data的下标
    function processData(time) {
      let idx
      const data_raw = toRaw(data)
      try {
        data_raw.forEach((item, index) => {
          if (item.value[0] === time) {
            idx = index
            throw new Error('停止')
          }
        })
      } catch (error) {
        // console.log(error)
      }
      return idx
    }

    function get_mock_data() {
      getData().then(res => {
        console.log(res)
        const get_data = res.data
        //如果获取的数据是十分钟之后的数据
        if (moment(get_data.value[0]).isSameOrBefore(time_last)) {
          const index = processData(get_data.value[0])
          data[index].value[1] = get_data.value[1]
        } else {
          data.shift()
          data.push(res.data)
        }
      })
    }

    // 执行定时任务
    function Interval() {
      //先执行一次获取初始时间的值
      get_mock_data()
      //然后在进行定时获取
      setInterval(get_mock_data, 60 * 1000)
    }


    function initLine() {
      mychart = proxy.$echarts.init(document.getElementById('line'))
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['eth0']
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: true
          },
          //刻度分离间隔,必须保持data中的数据等于10个，才是以每分钟为单位显示数据
          splitNumber: 10,
          //显示x轴坐标轴刻度
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true,
            showMaxLabel: true,
            showMinLabel: true,
            formatter: '{HH}:{mm}'
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: ['20%', '20%'],
          splitLine: {
            show: true
          },
          //显示坐标轴线
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          max: 1000,
          min: 0

        },
        series: [
          {
            name: 'eth0',
            type: 'line',
            //是否显示在线上显示原点
            showSymbol: true,
            //线是否是光滑的
            smooth: false,
            data: data
          },
        ]
      };

      mychart.setOption(option)
    }

    watch(data,
        () => {
          mychart.setOption({
            series: [
              {
                data: data
              }
            ]
          })
        })

    // 蜜罐状态信息
    const Honey_status = ref({
      running: 0,
      stopped: 0,
      count: 999
    })
    // 蜜罐状态仪表盘
    const guagechart = reactive({
      guage: '',
      guage_option: {
        series: [
          {
            type: 'gauge',
            min: 0,
            max: 32,
            radius: '90%',
            axisLine: {
              lineStyle: {
                color: [[1, '#B3B7BC']],
                width: 2,
              }
            },
            legend: {
              "top": 'middle'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            anchor: {
              show: false,
            },
            pointer: {
              show: false
            }
          },
          {
            type: 'gauge',
            min: 0,
            // max: 0,
            // center:['50%','50%'],
            //进度条显示情况
            progress: {
              show: true,
              roundCap: true,
              width: 8
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                color: [
                  [1, "#A9B3BD"]
                ],
                width: 8
              }
            },
            //显示小刻度线
            axisTick: {
              show: false
            },
            //显示大刻度线
            splitLine: {
              show: false
            },
            //指针，设置为false不显示
            pointer: {
              show: false
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 10,
              offsetCenter: [0, "60%"],
              itemStyle: {
                borderWidth: 2,
                borderColor: 'gray',
              }
            },
            axisLabel: {
              show: false
            },
            //显示仪表盘的名称，也就是蜜罐状态
            title: {
              show: true,
              offsetCenter: [0, "100%"]
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              offsetCenter: [0, '15%'],
            },
            data: [
              // {
              //   value: Honey_status.value.running,
              //   name: '蜜罐状态'
              // }
            ]
          }
        ]
      }
    })
    // 初始化蜜罐状态仪表盘
    const initGauge = () => {
      guagechart.guage = proxy.$echarts.init(document.getElementById('gauge'))
      refreshGuage()
      guagechart.guage.setOption(guagechart.guage_option)
    }
    // 刷新蜜罐状态仪表盘
    const refreshGuage = () => {
      console.log(Honey_status.value)
      guagechart.guage_option.series[1].data = []
      guagechart.guage_option.series[1].max = Honey_status.value.count
      guagechart.guage_option.series[1].detail.formatter = `{value}/${Honey_status.value.count}`
      guagechart.guage_option.series[1].data.push({
        value: Honey_status.value.running,
        name: '蜜罐状态'
      })
      guagechart.guage.setOption(guagechart.guage_option)
    }


    const initGauge1 = () => {
      const mychart = proxy.$echarts.init(document.getElementById('gauge1'))
      const options = {
        series: [
          {
            type: 'gauge',
            min: 0,
            max: 32,
            radius: '90%',
            axisLine: {
              lineStyle: {
                color: [[1, '#B3B7BC']],
                width: 2,
              }
            },
            legend: {
              "top": 'middle'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            anchor: {
              show: false,
            },
            pointer: {
              show: false
            }
          },
          {
            type: 'gauge',
            min: 0,
            max: 3,
            // center:['50%','50%'],
            //进度条显示情况
            progress: {
              show: true,
              roundCap: true,
              width: 8
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                color: [
                  [1, "#A9B3BD"]
                ],
                width: 8
              }
            },
            //显示小刻度线
            axisTick: {
              show: false
            },
            //显示大刻度线
            splitLine: {
              show: false
            },
            //指针，设置为false不显示
            pointer: {
              show: false
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 10,
              offsetCenter: [0, "60%"],
              itemStyle: {
                borderWidth: 2,
                borderColor: 'gray',
              }
            },
            axisLabel: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, "100%"]
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              offsetCenter: [0, '15%'],
              formatter: `{value}/${3}`
            },
            data: [
              {
                value: 1,
                name: '节点状态'
              }
            ]
          }
        ]
      }
      mychart.setOption(options)
    }

    const initGauge2 = () => {
      const mychart = proxy.$echarts.init(document.getElementById('gauge2'))
      const options = {
        series: [
          {
            type: 'gauge',
            min: 0,
            max: 32,
            radius: '90%',
            axisLine: {
              lineStyle: {
                color: [[1, '#B3B7BC']],
                width: 2,
              }
            },
            legend: {
              "top": 'middle'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            anchor: {
              show: false,
            },
            pointer: {
              show: false
            }
          },
          {
            type: 'gauge',
            min: 0,
            max: 3,
            // center:['50%','50%'],
            //进度条显示情况
            progress: {
              show: true,
              roundCap: true,
              width: 8
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                color: [
                  [1, "#A9B3BD"]
                ],
                width: 8
              }
            },
            //显示小刻度线
            axisTick: {
              show: false
            },
            //显示大刻度线
            splitLine: {
              show: false
            },
            //指针，设置为false不显示
            pointer: {
              show: false
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 10,
              offsetCenter: [0, "60%"],
              itemStyle: {
                borderWidth: 2,
                borderColor: 'gray',
              }
            },
            axisLabel: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, "100%"]
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              offsetCenter: [0, '15%'],
              formatter: `{value}/${3}`
            },
            data: [
              {
                value: 1,
                name: '蜜网状态'
              }
            ]
          }
        ]
      }
      mychart.setOption(options)
    }


    // 获取系统状态信息
    function getCpu_and_Mem_per() {
      // 获取系统时间，CPU、内存占用率
      GetSystemInfo_1().then(res => {
        console.log(res)
        Cpu_percentage.value = res.data.cpu.cpu_percentange
        Memory_percentage.value = res.data.virtual_memory.percent

        let time = res.data.system_time.system_time_now
        const time_moment = moment(new Date(time))
        System_time.weekday = getWeek(time_moment.day())
        System_time.time1 = time_moment.format('YYYY年M月D日')
        System_time.time2 = time_moment.format('HH:mm:ss')
        // console.log(res)
      })

      // 获取系统磁盘占用率
      GetDiskInfo().then(res => {
        Disk_percentage.value = res.data.disk_info[1][4].split("%")[0]
      })
    }

    // 获取三个仪表盘信息
    function Honey() {
      // 获取蜜罐状态信息
      Container_Count().then(res => {
        console.log(res);
        const {data} = res
        Honey_status.value.running = data.result["ContainersRunning"]
        Honey_status.value.stopped = data.result["ContainersStopped"]
        Honey_status.value.count = data.result["Containers"]
        refreshGuage()
      })
    }


    //获取星期几
    function getWeek(day) {
      switch (day) {
        case 1 :
          return '星期一'
        case 2 :
          return '星期二'
        case 3 :
          return '星期三'
        case 4 :
          return '星期四'
        case 5 :
          return '星期五'
        case 6 :
          return '星期六'
        case 7 :
          return '星期七'
      }
    }


    onMounted(() => {
      Honey()
      initGauge()
      initGauge1()
      initGauge2()

      initData()
      initLine()
      Interval()
      getCpu_and_Mem_per()
    })
    return {
      Honey_status,
      Cpu_percentage,
      Memory_percentage,
      Disk_percentage,
      tableData,
      System_time,
      customColorMethod
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  --el-table-header-bg-color: #eaedf1 !important;
  --el-table-tr-bg-color: #eaedf1 !important;
  --el-table-border-color: #5E5B5B !important;
}
</style>