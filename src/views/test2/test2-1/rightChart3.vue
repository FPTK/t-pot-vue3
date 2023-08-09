<template>
  <div id="ver-bar">
    <div class="dragRectTop"></div>
    <div class="tit01">
      攻击来源IP top10
      <!-- <button @click="getIpData">来源IP top10</button> -->
    </div>
    <div id="echartVB2" class="navVB"></div>
    <div class="dragRectBottom"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { IpData } from "@/api/system";
export default {
  components: {},
  data: function () {
    return {
      year: 2000,
      timer8: null,
    };
  },
  mounted() {
    this.echartVB();
    this.getIpData();
    if (this.timer8) {
      clearInterval(this.timer8);
    } else {
      this.timer8 = setInterval(() => {
        this.getIpData();
      }, 3000);
    }
  },
  methods: {
    echartVB() {
      this.myChart = echarts.init(document.getElementById("echartVB2"));
      this.options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 图表填充盒子的大小,很有用
        grid: {
          top: "20",
          left: "0",
          right: "10",
          bottom: "10",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "192.168.1.1",
              "192.168.1.2",
              "192.168.1.3",
              "192.168.1.4",
              "192.168.1.5",
              "192.168.1.6",
              "192.168.1.7",
              "192.168.1.8",
              "192.168.1.9",
              "192.168.1.10",
            ],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255)",
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
        series: [
          {
            name: "攻击数",
            type: "bar",
            // 柱状体大小
            barWidth: "65%",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            itemStyle: {
              normal: {
                barBorderRadius: 2,
                color: "rgba(244, 56, 127,1)",
                label: {
                  show: true,
                  color: "#fff",
                  position: "top", // 数值显示在顶部
                },
              },
            },
          },
        ],
      };
      this.myChart.setOption(this.options);
      window.addEventListener("resize", function () {
        this.myChart.resize();
      });
    },

    async getIpData() {
      var res = await IpData();
      var buckets = res.data.aggregations.tongji.buckets;
      // console.log(buckets);
      var xaxisData = [];
      var seriesData = [];
      for (var i = 0; i < buckets.length; i++) {
        xaxisData[i] = buckets[i].key;
        seriesData[i] = buckets[i].doc_count;
      }
      this.options.xAxis[0].data = xaxisData;
      this.options.series[0].data = seriesData;
      this.myChart.setOption(this.options);
    },
  },
  beforeUnmount() {
    this.myChart.dispose();

    if (this.timer8) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer8); //关闭
      console.log("Interval clear");
      this.timer8 = null;
    }
  },
};
</script>

<style scoped>
#ver-bar {
  /* background-image: url(../assets/line.png); */
  border: 0.5px solid #3386da;
  position: relative;
  padding: 0.2rem;
  height: 3.875rem;
  overflow-y: hidden;
  /* color: rgb(244, 56, 127); */
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

.navVB {
  height: calc(100% - 0.3rem);
  padding-top: 0.2rem;
}

.dragRectTop {
  width: 100%;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: hidden;
}

.dragRectTop::before {
  content: "";
  width: 10px;
  height: 10px;
  border-left: 2px solid skyblue;
  border-top: 2px solid skyblue;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
}

.dragRectTop::after {
  content: "";
  width: 10px;
  height: 10px;
  border-right: 2px solid skyblue;
  border-top: 2px solid skyblue;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

.dragRectBottom {
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.dragRectBottom::before {
  content: "";
  width: 10px;
  height: 10px;
  border-left: 2px solid skyblue;
  border-bottom: 2px solid skyblue;
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
}

.dragRectBottom::after {
  content: "";
  width: 10px;
  height: 10px;
  border-right: 2px solid skyblue;
  border-bottom: 2px solid skyblue;
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>