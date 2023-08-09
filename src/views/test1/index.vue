<template>
  <div class="box right">
    <div style="padding: 10px">
      <div id="line" style="width: 100%; height: 500px;"></div>
    </div>
  </div>
</template>

<script>
import {onMounted, onUnmounted, reactive, ref, getCurrentInstance, toRefs, watch, toRaw} from "vue"
import {getData} from "@/api/getecharsData";
import moment from 'moment'

export default {
  name: "index",
  setup() {
    moment.suppressDeprecationWarnings = true
    const {proxy} = getCurrentInstance()


    let mychart
    //流量数据
    const data = reactive([])
    //
    let time_last

    //先初始化前10分钟，使折线图先表示出来
    function initData() {
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
        const get_data = res.data
        //如果获取的数据是十分钟之后的数据
        if (moment(get_data.value[0]).isSameOrBefore(time_last)) {
          const index = processData(get_data.value[0])
          data[index].value[1] = get_data.value[1]
        } else {
          data.shift()
          data.push(res.data)
        }
        // console.log(data)
      })
    }

    function Interval() {
      //先执行一次获取初始时间的值
      get_mock_data()
      //然后在进行定时获取
      // setInterval(get_mock_data, 1000)
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

    onMounted(() => {
      initData()
      initLine()
      Interval()
    })
    return {}

  }
}
</script>

<style scoped>

</style>