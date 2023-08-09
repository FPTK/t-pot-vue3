<template>
  <div id="broken-line">
    <div class="dragRectTop"></div>
    <div class="tit01">
      攻击分类统计
      <!-- <button @click="getBehaviorClassData">攻击分类数据</button> -->
    </div>
    <div id="echartBl" class="navBl"></div>
    <div class="dragRectBottom"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { BehaviorClassData } from "@/api/system";
export default {
  components: {},
  data: function () {
    return {
      timer3: null,
    };
  },
  mounted() {
    this.echartBl();
    this.getBehaviorClassData();
    if (this.timer3) {
      clearInterval(this.timer3);
    } else {
      this.timer3 = setInterval(() => {
        this.getBehaviorClassData();
      }, 3000);
    }
  },
  methods: {
    echartBl() {
      this.myChart = echarts.init(document.getElementById("echartBl"));
      this.options = {
        tooltip: {},
        radar: {
          radius: "70%", //大小
          nameGap: 4, // 图中工艺等字距离图的距离
          center: ["50%", "65%"], // 图的位置
          name: {
            textStyle: {
              color: "rgba(101, 213, 255, 1)",
              fontSize: 15,
            },
            formatter: function (text) {
              text = text.replace(/\S{4}/g, function (match) {
                // console.log(match);
                return match + "\n";
              });
              return text;
            },
          },
          indicator: [
            { name: "可疑连接", max: "1000000" },
            { name: "异常行为", max: "1000000" },
            { name: "暴力破解", max: "1000000" },
            // { name: "漏洞利用", max: "100" },
          ],
          axisLine: {
            lineStyle: {
              color: "rgba(153, 209, 246, 0.2)",
            },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: "rgba(255,0,0,0)", // 图表背景的颜色
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "rgba(153, 209, 246, 0.2)", // 设置网格的颜色
            },
          },
        },
        series: [
          {
            name: "报警类型分析",
            type: "radar",
            symbol: "angle",
            itemStyle: {
              normal: {
                areaStyle: { type: "default" },
              },
            },
            data: [
              {
                symbol: "circle",
                symbolSize: 5,
                value: [0,0,0],
                areaStyle: { color: "rgba(64, 205, 241, 0.2)" },
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    color: "RGBA(0, 34, 66, 1)",
                    borderColor: "rgba(146, 225, 255, 1)",
                  },
                },
                lineStyle: {
                  color: "rgba(146, 225, 255, 1)",
                  width: 1,
                },
              },
            ],
          },
        ],
      };
      this.myChart.setOption(this.options);
      window.addEventListener("resize", function () {
        this.myChart.resize();
      });
    },

    async getBehaviorClassData() {
      var res = await BehaviorClassData();
      var AttackTypeDirectionArr = res.data.aggregations.tongji.buckets;
      // console.log(AttackTypeDirectionArr);
      var indicatorData = [];
      var seriesData = [];
      var max = 0;
      for (var i = 0; i < AttackTypeDirectionArr.length; i++) {
        var temp = {};
        if (AttackTypeDirectionArr[i].key == undefined) {
          // temp.name = '可疑连接'
          continue;
        } else {
          if (AttackTypeDirectionArr[i].key == 'SuspiciousConnection') {
            temp.name = '可疑连接';
          } else if (AttackTypeDirectionArr[i].key == 'BruteCrack') {
            temp.name = '暴力破解';
          } else if (AttackTypeDirectionArr[i].key == 'AbnormalBehavior') {
            temp.name = '异常行为';
          } else if (AttackTypeDirectionArr[i].key == 'Exploits') {
            temp.name = '漏洞利用';
          }
        }
        if (AttackTypeDirectionArr[i].doc_count == undefined) {
          seriesData[i] = 0;
        } else {
          seriesData[i] = AttackTypeDirectionArr[i].doc_count;
          if (AttackTypeDirectionArr[i].doc_count > max) {
            max = AttackTypeDirectionArr[i].doc_count;
          }
        }
        indicatorData.push(temp);
      }
      for (var i = 0;i < indicatorData.length; i++) {
        indicatorData[i]['max'] = max
      }
      console.log(indicatorData);
      console.log(seriesData);
      this.options.radar.indicator = indicatorData;
      this.options.series[0].data[0].value = seriesData;
      // this.options.series[0].data[0].value = [100776, 100, 100];

      this.myChart.setOption(this.options);
    },
  },

  beforeUnmount() {
    this.myChart.dispose();
    if (this.timer3) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer3); //关闭
      console.log("Interval clear");
      this.timer3 = null;
    }
  },
};
</script>

<style scoped>
#broken-line {
  /* background-image: url(../assets/line.png); */
  /* height: 3.5rem; */
  border: 0.5px solid #3386da;
  position: relative;
  /* padding: 0.2rem; */
  width: 3rem;
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
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

.navBl {
  height: 3rem;
  padding-top: 0.2rem;
}

.dragRectTop {
  width: 100%;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
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