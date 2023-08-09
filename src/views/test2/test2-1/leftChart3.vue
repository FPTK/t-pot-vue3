<template>
  <div id="broken-line">
    <div class="dragRectTop"></div>
    <div class="tit01">
      蜜罐受攻击统计
      <!-- <button @click="getHoneypotData">蜜罐</button> -->
    </div>
    <div id="echartBL2" class="navBl"></div>
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
      timer4: null,
    };
  },
  mounted() {
    this.echartBL();
    this.getHoneypotData();
    if (this.timer4) {
      clearInterval(this.timer4);
    } else {
      this.timer4 = setInterval(() => {
        this.getHoneypotData();
      }, 3000);
    }
  },
  methods: {
    echartBL() {
      this.myChart = echarts.init(document.getElementById("echartBL2"));
      this.options = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "蜜罐受到攻击占比",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "40%"], // 图的位置
            tooltip: {
              formatter: "{b}:\n攻击数: {c} \n 攻击占比: {d}%",
            },
            label: {
              position: "outside",
              color: "#fff",
              fontSize: 10,
              formatter: "{b}: {d}%",
            },
            labelLine: {
              show: true,
              showAbove: true,
              length: 3,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: [
              { value: 0, name: "Cowrie" },
              { value: 0, name: "Honeytrap" },
              { value: 0, name: "Ciscoasa" },
              { value: 0, name: "Dionaea" },
              { value: 0, name: "Adbhoney" },
            ],
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
      var seriesDataArr = [];
      for (var i = 0; i < buckets.length; i++) {
        var seriesData = {};
        seriesData.value = buckets[i].doc_count;
        seriesData.name = buckets[i].key;
        seriesDataArr.push(seriesData);
      }
      // console.log(seriesDataArr);
      this.options.series[0].data = seriesDataArr;
      this.myChart.setOption(this.options);
    },
  },

  beforeUnmount() {
    this.myChart.dispose();
    if (this.timer4) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer4); //关闭
      console.log("Interval clear");
      this.timer4 = null;
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
  margin: 0.2rem 0.2rem 0rem 0.2rem;
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