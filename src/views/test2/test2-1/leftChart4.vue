<template>
  <div id="pie">
    <div class="dragRectTop"></div>
    <div class="tit01">
      攻击输入用户名
      <!-- <button @click="getUsernameData">用户名词云</button> -->
    </div>
    <div id="echartPie" class="nav01"></div>
    <div class="dragRectBottom"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// echarts 5.0 只支持引入词云2.0 文件在/src/utils/echarts-wordcloud-2.0.0.min
import wordCloud from "@/utils/echarts-wordcloud-2.0.0.min.js";
import { UsernameData } from "@/api/system";

export default {
  components: {},
  data: function () {
    return {
      year: 2000,
      timer5: null,
    };
  },
  mounted() {
    this.echartPie();
    this.getUsernameData();
    if (this.timer5) {
      clearInterval(this.timer5);
    } else {
      this.timer5 = setInterval(() => {
        this.getUsernameData();
      }, 60000);
    }
  },
  methods: {
    echartPie() {
      this.myChart = echarts.init(document.getElementById("echartPie"));
      // mock数据
      var mockData = [
        { name: "root", value: 3328 },
        { name: "admin", value: 1045 },
        { name: "test", value: 834 },
        { name: "ubuntu", value: 804 },
        { name: "user", value: 532 },
        { name: "oracle", value: 493 },
        {
          name: "postgres",
          value: 479,
        },
        { name: "hadoop", value: 387 },
        { name: "git", value: 289 },
        { name: "nvidia", value: 287 },
        { name: "centos", value: 233 },
        { name: "dmdba", value: 228 },
        { name: "nagios", value: 207 },
        { name: "es", value: 206 },
        { name: "dspace", value: 201 },
        { name: "odoo", value: 180 },
        { name: "tomcat", value: 178 },
        { name: "mysql", value: 151 },
        { name: "testuser", value: 143 },
        { name: "huawei", value: 139 },
      ].slice();

      // 随机颜色
      var randcolor = () => {
        let r = 100 + ~~(Math.random() * 100);
        let g = 135 + ~~(Math.random() * 100);
        let b = 100 + ~~(Math.random() * 100);
        return `rgb(${r}, ${g}, ${b})`;
      };
      this.options = {
        // backgroundColor: '#fff',
        tooltip: {
          trigger: "item",
          padding: [10, 15],
          textStyle: {
            fontSize: 20,
          },
          formatter: (params) => {
            const { name, value } = params;

            return `
                    用户名：${name} <br/>
                    数量：${value}
                `;
          },
        },
        series: [
          {
            type: "wordCloud",
            shape: "circle",
            // 每个词云单词间隔大小
            gridSize: 25,
            // 字体大小范围
            sizeRange: [20, 50],
            rotationRange: [0, 0],
            // rotationStep: 45,
            // gridSize: 8,
            // 是否超出边界
            drawOutOfBound: false,
            textStyle: {
              fontFamily: "微软雅黑",
              color: function () {
                return randcolor();
              },
              emphasis: {
                shadowBlur: 20,
                shadowColor: "#333",
              },
            },
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "100%",
            data: mockData,
          },
        ],
      };
      this.myChart.setOption(this.options);
      window.addEventListener("resize", function () {
        this.myChart.resize();
      });
    },

    async getUsernameData() {
      var res = await UsernameData();
      var buckets = res.data.aggregations.tongji.buckets;
      // console.log(buckets);
      var seriesDataArr = [];
      for (var i = 0; i < buckets.length; i++) {
        var seriesData = {};
        seriesData.name = buckets[i].key;
        seriesData.value = buckets[i].doc_count;
        seriesDataArr.push(seriesData);
      }
      // console.log(seriesDataArr);
      this.options.series[0].data = seriesDataArr.slice(0, 50);
      this.myChart.setOption(this.options);
    },
  },

  beforeUnmount() {
    this.myChart.dispose();
    if (this.timer5) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer5); //关闭
      console.log("Interval clear");
      this.timer5 = null;
    }
  },
};
</script>

<style scoped>
#pie {
  /* background-image: url(../assets/line.png); */
  border: 0.5px solid #3386da;
  position: relative;
  padding: 0.2rem;
  width: 100%;
  height: 3.875rem;
}

.nav01 {
  height: 2.875rem;
  padding-top: 0.2rem;
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