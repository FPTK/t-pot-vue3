<template>
  <div id="map" class="size">
    <!-- <div class="bg1"></div> -->
    <!-- <div class="bg2"></div> -->
    <!-- <div class="bg3"></div> -->
  </div>
</template>

<script>
import * as world from "@/utils/world";
import * as echarts from "echarts";
import axios from "axios";
import { SessionCollapseData } from "@/api/system";

export default {
  components: {
    // ECharts,
  },
  data: function () {
    return {
      year: 2000,
      myChart: null,
      timer: null,
    };
  },
  mounted() {
    this.echartMid();
    this.getSessionCollapseData();
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.getSessionCollapseData();
      }, 10 * 1000);
    }
  },
  methods: {
    echartMid() {
      // 1. 实例化对象
      this.myChart = echarts.init(document.getElementById("map"));
      // 2. 指定配置和数据
      // 2. 指定配置和数据
      // 假数据 模拟数据
    },
    // getData() {
    //   axios.get("/userInfo3.json").then((res) => {
    //     // console.log(res);
    //     var geoCoordMap = res.data;
    //     this.processGeoMap(geoCoordMap);
    //   });
    // },
    processGeoMap(geoCoordMap, BJData, convertDataRes) {
      var BJData = BJData;
      var series = [];
      [["北京", BJData]].forEach(function (item, i) {
        // console.log(item);
        series.push(
          {
            name: item[2],
            type: "lines",
            // 图层 数值越大越显示在前面
            zlevel: 2,
            effect: {
              show: true,
              color: "#ffa022", // 飞行线颜色
              period: 2, //箭头指向速度，值越小速度越快
              trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "pin", //箭头图标 Charts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
              symbolSize: 5, //飞行线宽度
            },
            lineStyle: {
              normal: {
                color: "#0bc7f3",
                width: 0.5, //尾迹线条宽度
                opacity: 0, //尾迹线条透明度
                curveness: 0.1, //尾迹线条曲直度
              },
            },
            tooltip: {
              show: false,
            },
            data: convertDataRes,
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            showEffectOn: "render",
            rippleEffect: {
              //涟漪特效
              period: 2, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 2, //波纹圆环最大限制，值越大波纹越大
              // number: 20,
            },
            // 地图上国家点文字参数设置
            label: {
              normal: {
                show: false,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: "{b}", //圆环显示文字
                color: "white",
              },
              emphasis: {
                show: false,
                // color: "#FF6A6A",
              },
            },
            symbol: "circle", // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            // 地图上点的大小
            symbolSize: 15,
            itemStyle: {
              normal: {
                show: false,
              },
              // 鼠标移到点上 点显示的颜色
              emphasis: {
                show: false,
                color: "#FF6A6A",
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[0].name,
                value: geoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value,
                ]),
              };
            }),
          },
          //被攻击点
          {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4,
            },
            label: {
              normal: {
                show: true,
                color: "yellow",
                position: "right",
                formatter: "{b}",
              },
              emphasis: {
                show: true,
                color: "#FF6A6A",
              },
            },
            symbol: "pin",
            symbolSize: 30,
            itemStyle: {
              normal: {
                show: true,
                color: "red",
              },
              emphasis: {
                show: true,
                color: "#FF6A6A",
              },
            },
            data: [
              {
                name: item[0],
                // value: geoCoordMap[item[0]].concat([100]),
                value: geoCoordMap[item[0]],
                visualMap: false,
              },
            ],
          }
        );
      });
      var svg =
        "path://M32.597,9.782 L30.475,11.904 C30.085,12.294 29.452,12.294 29.061,11.904 C28.671,11.513 28.671,10.880 29.061,10.489 L31.182,8.368 C31.573,7.978 32.206,7.978 32.597,8.368 C32.987,8.759 32.987,9.392 32.597,9.782 ZM30.000,30.500 C30.000,31.328 29.329,32.000 28.500,32.000 L5.500,32.000 C4.672,32.000 4.000,31.328 4.000,30.500 C4.000,29.672 4.672,29.000 5.500,29.000 L8.009,29.000 L8.009,18.244 C8.009,13.139 12.034,9.000 17.000,9.000 C21.966,9.000 25.992,13.139 25.992,18.244 L25.992,29.000 L28.500,29.000 C29.329,29.000 30.000,29.672 30.000,30.500 ZM17.867,14.444 L13.000,22.000 L17.000,22.000 L17.133,26.556 L21.000,20.000 L17.000,20.000 L17.867,14.444 ZM25.221,6.327 C25.033,6.846 24.459,7.113 23.940,6.924 C23.421,6.735 23.153,6.162 23.342,5.643 L24.368,2.823 C24.557,2.304 25.131,2.037 25.650,2.226 C26.169,2.415 26.436,2.989 26.248,3.508 L25.221,6.327 ZM17.000,5.000 C16.448,5.000 16.000,4.552 16.000,4.000 L16.000,1.000 C16.000,0.448 16.448,0.000 17.000,0.000 C17.552,0.000 18.000,0.448 18.000,1.000 L18.000,4.000 C18.000,4.552 17.552,5.000 17.000,5.000 ZM10.028,7.197 C9.509,7.386 8.935,7.118 8.746,6.599 L7.720,3.780 C7.532,3.261 7.799,2.687 8.318,2.498 C8.837,2.309 9.411,2.577 9.600,3.096 L10.626,5.915 C10.815,6.434 10.547,7.008 10.028,7.197 ZM3.354,12.268 L1.232,10.146 C0.842,9.756 0.842,9.123 1.232,8.732 C1.623,8.342 2.256,8.342 2.646,8.732 L4.768,10.854 C5.158,11.244 5.158,11.877 4.768,12.268 C4.377,12.658 3.744,12.658 3.354,12.268 Z";

      var option = {
        // backgroundColor: "#363B40",
        // tooltip 悬浮框配置项
        tooltip: {
          trigger: "item",
          // 文本框背景颜色
          backgroundColor: "rgba(65, 65, 65, 0.694)",
          borderColor: "rgba(65, 65, 65, 0.694)",
          // 悬浮框字体颜色
          textStyle: {
            color: "white",
          },
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function (params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            if (params.seriesType == "effectScatter") {
              var res = "";
              var name = params.name;
              var value = params.value[params.seriesIndex + 1];
              res =
                "<span style='color:#fff;'>" +
                "攻击" +
                "</span><br/> <span style='color:#fff;'>数据: " +
                value +
                "</span>";
              return res;
            } else if (params.seriesType == "lines") {
              return (
                params.name + " -> " + params.name + "<br />" + params.value
              );
            } else {
              return params.name;
            }
          },
        },
        visualMap: {
          //图例值控制
          show: true,
          type: "piecewise",
          pieces: [
            // 控制地图上点的颜色
            {
              max: 50, // 对应数值最大值
              label: "攻击数小于" + 50,
              color: "#a6c84c",
            },
            {
              min: 50,
              max: 10000,
              label: "攻击数大于" + 50 + ", 小于" + 10000,
              color: "#3ed4ff",
            },
            {
              min: 10000,
              label: "攻击数大于" + 10000,
              color: "#bb2e2e",
            },
          ],
          calculable: false,
          textStyle: {
            color: "#ffffff",
          },
        },
        // 地图配置项
        geo: {
          map: "world",
          show: true,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: true, //是否允许缩放
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: "170%", // 地图缩放比例
          itemStyle: {
            normal: {
              show: "true",
              color: "#04284e", //地图背景色
              borderColor: "#5bc1c9", //省市边界线
            },
            emphasis: {
              show: "true",
              color: "rgba(37, 43, 61, .5)", //悬浮背景
            },
          },
        },

        series: series,
      };
      this.myChart.setOption(option);

      window.addEventListener("resize", function () {
        this.myChart.resize();
      });
    },
    async getSessionCollapseData() {
      var res = await SessionCollapseData();
      var buckets = res.data.aggregations.filter_agg.tongji.buckets;
      // console.log(buckets);
      var BJData = [];
      var MapData = {};
      var convertDataRes = [];
      MapData["北京"] = [116.4551, 40.2539];
      for (var i = 0; i < buckets.length; i++) {
        var temp = [buckets[i].loc.location.lon, buckets[i].loc.location.lat];
        BJData[i] = [
          { name: "" + i + "", value: buckets[i].loc.count },
          { name: "北京" },
        ];
        convertDataRes[i] = [
          { coord: temp, value: buckets[i].loc.count },
          { coord: MapData["北京"] },
        ];
        MapData["" + i + ""] = temp;
      }
      // console.log(convertDataRes);
      // console.log(MapData);
      // console.log(BJData);
      this.processGeoMap(MapData, BJData, convertDataRes);
    },
  },

  beforeUnmount() {
    this.myChart.dispose();
    clearInterval(this.timer);
    console.log("Interval clear");
    this.timer = null;
  },
};
</script>

<style scoped>
#map {
  /* background-image: url(../assets/line.png); */
  /* border: 0.5px solid rgba(255,255,255,0.2); */
  position: relative;
}

.size {
  width: 100%;
  height: 80%;
}
#map .bg1 {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/lbx.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  animation: xuanzhuan 10s linear infinite;
  /* color: rgba(65, 65, 65, 0.694); */
}

#map .bg2 {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/map.png");
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  animation: xuanzhuan 10s linear infinite;
  opacity: 0.5;
}

#map .bg3 {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/jt.png");
  background-position: center;
  background-size: 54%;
  background-repeat: no-repeat;
  animation: xuanzhuan 10s linear infinite;
  opacity: 0.5;
}
@keyframes xuanzhuan {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-360deg);
  }
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