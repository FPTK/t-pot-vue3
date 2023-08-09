<template>
  <div id="broken-line">
    <div class="dragRectTop"></div>
    <div class="tit01">
      受攻击服务 top10
      <!-- <button @click="getHoneypotData">受攻击服务top10</button> -->
    </div>
    <div id="echartBl3" class="navBl"></div>
    <div class="dragRectBottom"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { HoneypotData } from "@/api/system";
export default {
  components: {},
  data: function () {
    return {
      year: 2000,
      timer7: null,
    };
  },
  mounted() {
    this.echartBl3();
    this.getHoneypotData();
    if (this.timer7) {
      clearInterval(this.timer7);
    } else {
      this.timer7 = setInterval(() => {
        this.getHoneypotData();
      }, 3000);
    }
  },
  methods: {
    echartBl3() {
      this.myChart = echarts.init(document.getElementById("echartBl3"));
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
              "adb",
              "ftp",
              "http",
              "https",
              "ssh",
              "smtp",
              "mysql",
              "intelamt",
              "pop3",
              "postgresql",
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
                color: "rgba(255,255,255)",
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
                color: "rgba(98, 201, 141,1)",
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

    async getHoneypotData() {
      var res = await HoneypotData();
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
    if (this.timer7) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer7); //关闭
      console.log("Interval clear");
      this.timer7 = null;
    }
  },
};
</script>

<style scoped>
#broken-line {
  /* background-image: url(../assets/line.png); */
  border: 0.5px solid #3386da;
  position: relative;
  padding: 0.2rem;
  height: 3.875rem;
  margin-bottom: 0.2rem;
  color: rgb(128, 6, 6);
}

.navBl {
  height: calc(100% - 0.3rem);
  padding-top: 0.2rem;
}

.dragRectTop {
  width: 100%;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
}

.tit01 {
  background: linear-gradient(to right, rgb(48, 82, 174), rgba(48, 82, 174, 0));
  color: #fff;
  font-size: 0.3rem;
  padding: 0.1rem 0.1rem;
  height: 0.5rem;
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