<template>
  <div id="bar">
    <div class="dragRectTop"></div>
    <div class="tit01">近七天攻击趋势</div>
    <div id="echart1" class="nav01"></div>
    <div class="dragRectBottom"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { HoneypotWeekData } from "@/api/system";

export default {
  components: {},
  data: function () {
    return {
      year: 2000,
      timer1: null,
    };
  },
  mounted() {
    this.echarts_1();
    this.getHoneypotAttackData();
    if (this.timer1) {
      clearInterval(this.timer1);
    } else {
      this.timer1 = setInterval(() => {
        this.getHoneypotAttackData();
      }, 3000);
    }
  },
  methods: {
    echarts_1() {
      this.myChart = echarts.init(document.getElementById("echart1"));
      this.options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B",
            },
          },
        },
        legend: {
          show: false,
          align: "left",
          right: "0",
          top: "0",
          type: "plain",
          textStyle: {
            color: "#7ec7ff",
            fontSize: 16,
          },
          // icon:'rect',
          itemGap: 25,
          itemWidth: 18,
          icon: "path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
          data: [
            {
              name: "暴力破解",
            },
            {
              name: "可疑连接",
            },
          ],
        },
        grid: {
          left: "0",
          right: "20",
          top: "30",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.6)",
              },
            },
            data: ["10.2", "10.3", "10.4", "10.5", "10.6", "10.7"],
          },
        ],
        yAxis: [
          {
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(255,255,255,.6)",
              },
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: "dotted",
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "攻击数",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 10,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 2,
                color: "rgba(98, 201, 141,1)",
              },
              borderColor: "rgba(0,0,0,.4)",
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(98, 201, 141, 0.5)",
                    },
                    {
                      offset: 1,
                      color: "rgba(98, 201, 141, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "rgba(98, 201, 141,1)",
                borderColor: "rgba(98, 201, 141,.2)",
                borderWidth: 12,
                label: {
                  show: true,
                  color: "#fff",
                  position: "top", // 数值显示在顶部
                },
              },
            },
            data: [0, 0, 0, 0, 0, 0, 0],
          },
          // {
          //   name: "可疑连接",
          //   type: "line",
          //   smooth: false,
          //   symbol: "circle",
          //   symbolSize: 10,
          //   showSymbol: false,
          //   lineStyle: {
          //     normal: {
          //       width: 2,
          //       color: "rgba(25,163,223,1)", // 线条颜色
          //     },
          //     borderColor: "rgba(0,0,0,.4)",
          //   },
          //   itemStyle: {
          //     color: "rgba(25,163,223,1)",
          //     borderColor: "rgba(25,163,223,.2)",
          //     borderWidth: 12,
          //   },
          //   areaStyle: {
          //     //区域填充样式
          //     normal: {
          //       //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          //       color: new echarts.graphic.LinearGradient(
          //         0,
          //         0,
          //         0,
          //         1,
          //         [
          //           {
          //             offset: 0,
          //             color: "rgba(25,163,223,.3)",
          //           },
          //           {
          //             offset: 1,
          //             color: "rgba(25,163,223, 0)",
          //           },
          //         ],
          //         false
          //       ),
          //       shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
          //       shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          //     },
          //   },
          //   data: [40, 60, 22, 85, 50, 40],
          // },
        ],
      };
      this.myChart.setOption(this.options);
    },

    async getHoneypotAttackData() {
      var res = await HoneypotWeekData();
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
      this.options.xAxis[0].data = xAxisData;
      this.myChart.setOption(this.options);
    },
  },
  beforeUnmount() {
    this.myChart.dispose();
    if (this.timer1) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer1); //关闭
      console.log("Interval clear");
      this.timer1 = null;
    }
  },
};
</script>

<style scoped>
#bar {
  /* background-image: url(../assets/line.png); */
  /* height: 3.5rem; */
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
  height: 3rem;
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