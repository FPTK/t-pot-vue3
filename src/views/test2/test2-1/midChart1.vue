<template>
  <div id="bar2">
    <div class="dragRectTop"></div>
    <div class="tit01">
      近十二月攻击趋势统计
      <!-- <button @click="getHoneypotMonthAttackData">一年攻击数据</button> -->
    </div>
    <div id="echart2" class="nav01"></div>
    <div class="dragRectBottom"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { HoneypotMonthAttackData } from "@/api/system";
export default {
  components: {},
  data: function () {
    return {
      year: 2000,
      timer6: null,
    };
  },
  mounted() {
    this.echarts_1();
    this.getHoneypotMonthAttackData();
    if (this.timer6) {
      clearInterval(this.timer6);
    } else {
      this.timer6 = setInterval(() => {
        this.getHoneypotMonthAttackData();
      }, 10000);
    }
  },
  methods: {
    echarts_1() {
      this.myChart = echarts.init(document.getElementById("echart2"));
      this.options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 图表填充盒子的大小,很有用
        grid: {
          top: "10",
          left: "0",
          right: "10",
          bottom: "40",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,1)",
                fontSize: "12",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,1)",
                fontSize: "12",
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.3)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.3)",
              },
            },
          },
        ],
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            filterMode: "empty",
            start: 0,
            end: 100,
            height: 22,
            bottom: 20,
          },
        ],
        series: [
          {
            name: "受攻击数",
            type: "bar",
            stack: "总数",
            barWidth: "55%",
            data: [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            itemStyle: {
              // barBorderRadius: 5,
              color: "#C23531",
            },
          },
          // {
          //   name: "异常行为",
          //   type: "bar",
          //   stack: "总数",
          //   barWidth: "55%",
          //   data: [
          //     200, 250, 330, 334, 820, 520, 720, 410, 220, 360, 790, 560, 120,
          //   ],
          //   itemStyle: {
          //     // barBorderRadius: 5,
          //     color: "#2F4554",
          //   },
          // },
          // {
          //   name: "暴力破解",
          //   type: "bar",
          //   stack: "总数",
          //   barWidth: "55%",
          //   data: [
          //     200, 250, 330, 334, 820, 520, 720, 410, 220, 360, 790, 560, 120,
          //   ],
          //   itemStyle: {
          //     // barBorderRadius: 5,
          //     color: "#61A0A8",
          //   },
          // },
          // {
          //   name: "漏洞利用",
          //   type: "bar",
          //   stack: "总数",
          //   barWidth: "55%",
          //   data: [
          //     200, 250, 330, 334, 820, 520, 720, 410, 220, 360, 790, 560, 120,
          //   ],
          //   itemStyle: {
          //     // barBorderRadius: 5,
          //     color: "#D48265",
          //   },
          // },
          {
            name: "总数",
            type: "line",
            stack: "总数",
            // symbolSize:20,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(252,230,48,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "top",
                  color: "#fff",
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0,
            ],
          },
        ],
      };
      this.myChart.setOption(this.options);
      window.addEventListener("resize", function () {
        this.myChart.resize();
      });
    },

    async getHoneypotMonthAttackData() {
      var res = await HoneypotMonthAttackData();
      var buckets = res.data.aggregations.tongji.buckets;
      // console.log(buckets);
      var xAxisData = [];
      var seriesDataArr = [];
      for (var i = 0; i < buckets.length; i++) {
        xAxisData[i] = buckets[i].key_as_string.substring(0, 10);
        seriesDataArr[i] = buckets[i].doc_count;
      }
      // console.log(xAxisData);
      // console.log(seriesDataArr);
      this.options.series[0].data = seriesDataArr;
      this.options.series[1].data = seriesDataArr;
      this.options.xAxis[0].data = xAxisData;
      this.myChart.setOption(this.options);
    },
  },
  beforeUnmount() {
    this.myChart.dispose();
    if (this.timer6) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer6); //关闭
      console.log("Interval clear");
      this.timer6 = null;
    }
  },
};
</script>

<style scoped>
#bar2 {
  border: 0.5px solid #3386da;
  position: relative;
  padding: 0.2rem;
  height: 3.875rem;
}

.tit01 {
  background: linear-gradient(
    to right,
    rgba(48, 82, 174, 1),
    rgba(48, 82, 174, 0)
  );
  color: #fff;
  font-size: 0.3rem;
  padding: 0.1rem 0.1rem;
  height: 0.5rem;
}

.nav01 {
  height: calc(100% - 0.3rem);
  padding-top: 0.2rem;
}

/* 图表的四个角 */
.dragRectTop {
  width: 100%;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
}

/* 左上方的角 */
.dragRectTop::before {
  content: "";
  width: 10px;
  height: 10px;
  border-left: 3px solid #3386da;
  border-top: 3px solid #3386da;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
}

/* 右上方的角 */
.dragRectTop::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 10px;
  border-right: 3px solid #3386da;
  border-top: 3px solid #3386da;
  display: block;
}

.dragRectBottom {
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
}

/* 左下方的角 */
.dragRectBottom::before {
  content: "";
  width: 10px;
  height: 10px;
  border-left: 3px solid #3386da;
  border-bottom: 3px solid #3386da;
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
}

/* 右下方的角 */
.dragRectBottom::after {
  content: "";
  width: 10px;
  height: 10px;
  border-right: 3px solid #3386da;
  border-bottom: 3px solid #3386da;
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>