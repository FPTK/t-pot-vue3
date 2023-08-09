<template>
  <div id="dashboard2">
    <div class="dragRectTop"></div>
    <div class="tit01">内存使用率</div>
    <div id="echartDB2" class="navDB"></div>
    <div class="dragRectBottom"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  components: {},
  data: function () {
    return {
      year: 2000,
    };
  },
  mounted() {
    this.echartDB1();
  },
  methods: {
    echartDB1() {
      var myChart = echarts.init(document.getElementById("echartDB2"));
      var options = {
        // backgroundColor: "#0E1327",
        title: [
          {
            text: "内存利用率",
            left: "center",
            top: "85%",
            textStyle: {
              color: "#3488db",
              fontSize: 20,
              fontFamily: "cuhei",
              fontWeight: 600,
            },
          },
        ],
        series: [
          {
            type: "gauge",
            axisLine: {
              lineStyle: {
                width: 5,
                color: [
                  [0.2, "#42e4fb"],
                  [0.8, "#3488db"],
                  [1, "#f9387f"],
                ],
              },
            },
            // 表盘大小
            radius: "100%",
            // 仪表盘指针圆
            markPoint: {
              animation: false,
              silent: true,
              data: [
                {
                  x: "50%",
                  y: "50%",
                  symbol: "circle",
                  symbolSize: 20,
                  itemStyle: {
                    color: "auto",
                  },
                },
                {
                  x: "50%",
                  y: "50%",
                  symbol: "circle",
                  symbolSize: 20,
                  itemStyle: {
                    color: "#fff",
                  },
                },
              ],
            },
            pointer: {
              // 仪表盘指针
              //icon:'none',
              width: 7,
              length: "70%",
              itemStyle: {
                color: "auto",
              },
            },
            // 刻度长度
            axisTick: {
              distance: 0,
              length: 7,
              lineStyle: {
                color: "auto",
                width: 3,
              },
            },
            // 刻度大小
            splitLine: {
              distance: 0,
              length: 15,
              lineStyle: {
                color: "auto",
                width: 4,
              },
            },
            // 刻度数据离表盘距离和大小
            axisLabel: {
              color: "#3488db",
              distance: 10,
              fontSize: 12,
            },
            // 仪表盘中文字的大小
            detail: {
              //valueAnimation: true,
              formatter: "{value} %",
              color: "white",
              fontSize: 20,
            },
            data: [
              {
                value: 85,
              },
            ],
          },
        ],
      };
      myChart.setOption(options);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>

<style scoped>
#dashboard2 {
  /* background-image: url(../assets/line.png); */
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
  padding: 0.03rem 0.1rem;
  height: 0.5rem;
}

.navDB {
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