<template>
  <div class="header">
    <h1>花境欺骗诱捕系统</h1>
    <div class="showtime">当前时间为：{{ nowTime }}</div>
    <div class="logo">华境安全</div>
    <div class="fanhui">
      <router-link class="route" :to="{ path: '/bigDataVisual' }"
        >攻击大屏</router-link
      >
      <router-link class="route" :to="{ path: '/' }">返回</router-link>
    </div>
  </div>
  <div class="charts">
    <div class="left">
      <!-- 左侧第一个图表 -->
      <leftChart1></leftChart1>
      <!-- 左侧第二个图表 -->
      <div class="leftMid">
        <leftChart2></leftChart2>
        <leftChart3></leftChart3>
      </div>
      <!-- 左侧第三个图表 -->
      <leftChart4></leftChart4>
    </div>

    <div class="mid">
      <midChart1></midChart1>
      <div class="midBottom">
        <div class="mid1">
          <div class="tit01">
            实时攻击
            <!-- <button @click="getLastRTAData">RTAData测试</button> -->
          </div>
          <div class="text" ref="text">
            <div class="allnav"></div>
          </div>
        </div>
        <!-- <div class="mid2">
            <midChart2></midChart2>
            <midChart3></midChart3>
          </div> -->
      </div>
    </div>

    <div class="right">
      <rightChart1></rightChart1>
      <rightChart2></rightChart2>
      <rightChart3></rightChart3>
    </div>
  </div>
</template>

<script>
import leftChart1 from "./leftChart1";
import leftChart2 from "./leftChart2";
import leftChart3 from "./leftChart3";
import leftChart4 from "./leftChart4";
import rightChart1 from "./rightChart1";
import rightChart2 from "./rightChart2";
import rightChart3 from "./rightChart3";
import midChart1 from "./midChart1";
import { onBeforeUnmount } from "vue";
import { RTAData } from "@/api/system";
import moment from "moment";

export default {
  name: "test1",
  data: function () {
    return {
      nowTime: "",
      timer: null,
      timer2: null,
    };
  },
  components: {
    leftChart1,
    leftChart2,
    leftChart4,
    rightChart2,
    rightChart3,
    leftChart3,
    rightChart1,
    midChart1,
  },
  beforeCreate: () => {
    console.log("generate css");
    document.getElementsByTagName("html")[0].className = "add_html";
    document.getElementsByTagName("body")[0].className = "add_body";
    // document.querySelector('#app').style.height = 0;
    document.querySelector("#app").className = "add_app";
  },
  mounted() {
    if (this.timer) {
      clearInterval(this.timer1);
    } else {
      this.timer = setInterval(() => {
        this.nowTime = this.getNowTime();
      }, 1000);
    }
    this.run();
  },

  methods: {
    getNowTime() {
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month = myDate.getMonth() + 1;
      let date = myDate.getDate();
      let hour =
        myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
      let minute =
        myDate.getMinutes() < 10
          ? "0" + myDate.getMinutes()
          : myDate.getMinutes();
      let second =
        myDate.getSeconds() < 10
          ? "0" + myDate.getSeconds()
          : myDate.getSeconds();
      return `${year}年${month}月${date}日${hour}:${minute}:${second}`;
    },

    addText() {
      var div = this.$refs.text;
      // console.log(allnav);
      div.innerHTML +=
        "<div style = 'font-size: 20px; word-break: break-all; margin-bottom: 0.1rem;'>" +
        "<span style = 'color: rgba(244, 56, 127, 1);'>蜜罐(Cowrie)：</span>" +
        "<span>2022-04-29 14:55:16</span>" +
        "<span>&nbsp;可疑连接#尝试连接UDP端口137&nbsp;</span>" +
        "<span>192.168.4.107 : 10000</span>" +
        "<span>→</span>" +
        "<span>192.168.4.97 : 137</span>" +
        " </div>";
      div.scrollTop = div.scrollHeight;
    },

    async getLastRTAData() {
      var res = await RTAData();
      var resData = res.data.hits.hits;
      // console.log(resData);
      var div = this.$refs.text;
      this.lastAttackData = [];
      for (var i = resData.length - 1; i >= 0; i--) {
        var tempObj = resData[i]._source;
        var nowTime = moment(tempObj.timestamp).format("YYYY-MM-DD HH:mm:ss");
        var attackText =
          "<div style = 'font-size: 20px; word-break: break-all; margin-bottom: 0.1rem;'>" +
          "<span style = 'color: rgba(244, 56, 127, 1);'>" +
          "蜜罐(" +
          tempObj.type +
          "): " +
          "</span>" +
          "<span style = 'color: rgba(252,230,48,1);'>" +
          nowTime +
          "</span>" +
          "<span>&nbsp;可疑连接=>尝试连接" +
          " " +
          tempObj.dest_port +
          "端口" +
          "&nbsp;</span>" +
          "<span>" +
          tempObj.src_ip +
          " : " +
          tempObj.src_port +
          "</span>" +
          "<span>→</span>" +
          "<span>" +
          tempObj.dest_ip +
          " : " +
          tempObj.dest_port +
          "</span>" +
          " </div>";
        div.innerHTML += attackText;
        this.lastAttackData.push(tempObj);
        div.scrollTop = div.scrollHeight;
      }
      // console.log(this.lastAttackData);
    },

    async getNewRTAData() {
      var res = await RTAData();
      var resData = res.data.hits.hits;
      // console.log(resData);
      var div = this.$refs.text;
      var newAttackData = [];
      for (var i = resData.length - 1; i >= 0; i--) {
        var j = 0;
        if (
          resData[j]._source.session ==
          this.lastAttackData[this.lastAttackData.length - 1].session
        ) {
          console.log("无新攻击数据");
          // console.log(resData);
          return 0;
        } else {
          var tempObj = resData[i]._source;
          var nowTime = moment(tempObj.timestamp).format("YYYY-MM-DD HH:mm:ss");
          var attackText =
            "<div style = 'font-size: 20px; word-break: break-all; margin-bottom: 0.1rem;'>" +
            "<span style = 'color: rgba(244, 56, 127, 1);'>" +
            "蜜罐(" +
            tempObj.type +
            "): " +
            "</span>" +
            "<span style = 'color: rgba(252,230,48,1);'>" +
            nowTime +
            "</span>" +
            "<span>&nbsp;可疑连接=>尝试连接" +
            " " +
            tempObj.dest_port +
            "端口" +
            "&nbsp;</span>" +
            "<span>" +
            tempObj.src_ip +
            " : " +
            tempObj.src_port +
            "</span>" +
            "<span>→</span>" +
            "<span>" +
            tempObj.dest_ip +
            " : " +
            tempObj.dest_port +
            "</span>" +
            " </div>";
          div.innerHTML += attackText;
          div.scrollTop = div.scrollHeight;
          newAttackData.push(tempObj);
          j += 1;
        }
      }
      this.lastAttackData = newAttackData;
      console.log(newAttackData);
    },

    async run() {
      await this.getLastRTAData();
      this.timer2 = setInterval(() => {
        this.getNewRTAData();
      }, 5000);
    },
  },
  setup() {
    onBeforeUnmount(() => {
      document.getElementsByTagName("html")[0].className = "";
      document.getElementsByTagName("body")[0].className = "";
      document.querySelector("#app").className = "";
      document.querySelector("#app").className = "add_app1";
    });
  },

  beforeUnmount() {
    if (this.timer) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer); //关闭
      console.log("Interval clear");
      this.timer = null;
    }
    if (this.timer2) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer2); //关闭
      console.log("Interval clear");
      this.timer2 = null;
    }
  },
};
</script>

<style>
.add_html {
  font-size: calc(100vw / 24) ;
  /* font-size: 63px; */
  color: #fff;
}

.add_app {
  background: linear-gradient(
    25deg,
    #0f2249,
    #182e5a 20%,
    #0f2249 40%,
    #182e5a 60%,
    #0f2249 80%,
    #182e5a 100%
  );
}
.add_app1 {
  height: 100%;
}

.add_body {
  font-size: 12px;
  background: linear-gradient(
    25deg,
    #0f2249,
    #182e5a 20%,
    #0f2249 40%,
    #182e5a 60%,
    #0f2249 80%,
    #182e5a 100%
  );
  color: #fff;
  font-size: 0.1rem;
}
</style>

<style lang="scss" scoped>
.real-time-alert-div {
  font-size: 20px;
  word-break: break-all;
  margin-bottom: 0.1rem;
}

.textStyle {
  color: rgba(244, 56, 127, 1);
}

.header {
  width: 100vw;
  text-align: center;
  position: relative;
  /* 125px / 10 */
  height: 1.25rem;
  line-height: 1.25rem;
  background-image: url(../../../assets/head_bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* header中的标题样式 */
.header h1 {
  width: 100%;
  font-size: 0.6rem;
  line-height: 1.15rem;
}

.header .showtime {
  position: absolute;
  right: 0.5rem;
  top: 20%;
  height: 0.5rem;
  line-height: 0.2rem;
  /* margin-top: 0.25rem; */
  font-size: 0.25rem;
}

.header .logo {
  position: absolute;
  left: 0.5rem;
  top: 20%;
  height: 0.5rem;
  line-height: 0.2rem;
  /* margin-top: 0.25rem; */
  font-size: 0.25rem;
}

.fanhui {
  position: absolute;
  left: 1.75rem;
  top: 20%;
  height: 0.5rem;
  line-height: 0.2rem;
  /* margin-top: 0.25rem; */
}

.route {
  margin-left: 10px;
  text-decoration: none;
  font-size: 0.25rem;
  color: #409eff;
}

.dropDown {
  position: absolute;
  left: 2.75rem;
  top: 20%;
  height: 0.5rem;
  line-height: 0.2rem;
  /* margin-top: 0.25rem; */
  font-size: 0.25rem;
}

/* header下面的大盒子样式 */
.charts {
  flex: 1;
  width: 99vw;
  height: 90%;
  padding: 0.15rem 0.15rem;
  display: flex;
}

/* 大盒子分为左中右三个盒子 */
/* flex将左中右三个盒子按3:5:3划分 */
/* 左侧最上方那个盒子 */
.charts .left {
  flex: 3;
  display: flex;
  /* 下面两个样式分别实现将左侧盒子中的图表垂直排列并且均匀分布在盒子中 */
  flex-direction: column;
}

.charts .leftMid {
  /* flex将左中右三个盒子按3:5:3划分 */
  display: flex;
  flex-direction: row;
  /* 下面两个样式分别实现将左侧盒子中的图表垂直排列并且均匀分布在盒子中 */
  justify-content: space-between;
  /* height: 3.875rem; */
  position: relative;
  padding: 0.2rem 0rem;
}

.charts .mid {
  /* width: 9rem; */
  flex: 5;
  display: flex;
  flex-direction: column;
  padding: 0rem 0.5rem;
}

.charts .midBottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 9.75rem;
  position: relative;
}

.mid1 {
  /* flex将左中右三个盒子按3:5:3划分 */
  display: flex;
  flex-direction: column;
  /* 下面两个样式分别实现将左侧盒子中的图表垂直排列并且均匀分布在盒子中 */
  width: 100%;
  height: 7.95rem;
  position: relative;
  padding: 0.2rem;
  border: 1px solid #3386da;
  /* background: pink; */
  margin: 0.2rem 0rem 0rem 0rem;
}

.text {
  overflow-y: scroll;
}

.mid2 {
  /* flex将左中右三个盒子按3:5:3划分 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 7.95rem;
  position: relative;
  /* background: pink; */
  margin: 0.2rem 0rem 0rem 0.1rem;
}

.mid2top {
  display: flex;
  height: 3.875rem;
  position: relative;
  border: 1px solid #3386da;
  padding: 0.2rem;
}

.mid2bottom {
  display: flex;
  height: 3.875rem;
  position: relative;
  border: 1px solid #3386da;
  padding: 0.2rem;
}

.tit01 {
  background: linear-gradient(
    to right,
    rgba(48, 82, 174, 1),
    rgba(48, 82, 174, 0)
  );
  width: 100%;
  color: #fff;
  font-size: 0.3rem;
  padding: 0.1rem 0.1rem;
  margin-bottom: 0.1rem;
  height: 0.5rem;
}

.tit02 {
  background: linear-gradient(
    to right,
    rgba(48, 82, 174, 1),
    rgba(48, 82, 174, 0)
  );
  width: 100%;
  color: #fff;
  font-size: 0.3rem;
  padding: 0.03rem 0.1rem;
  height: 0.5rem;
}

.tit03 {
  background: linear-gradient(
    to right,
    rgba(48, 82, 174, 1),
    rgba(48, 82, 174, 0)
  );
  width: 100%;
  color: #fff;
  font-size: 0.3rem;
  padding: 0.03rem 0.1rem;
  height: 0.5rem;
}

.mid .title {
  margin: 0rem 0.1rem 0rem 0.1rem;
  padding: 0.2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0.5px solid #3386da;
  background: rgba(101, 132, 226, 0.2);
}

.mid .title .number {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
  color: #f5d0a9;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.mid .title .desc {
  width: 100%;
  height: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: rgba(255, 255, 255, 0.8);
}

.charts .right {
  flex: 3;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
}

.charts .rightMid {
  /* padding: 0.1rem 0rem 0rem 0rem; */
  /* height: 3.875rem; */
  display: flex;
  flex-direction: column;
  height: 3.875rem;
  position: relative;
  padding: 0.1rem 0rem;
  margin-top: 0.1rem;
}

.borderTop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.1rem;
}

.borderTop::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0.4rem;
  height: 0.2rem;
  border-left: 2px solid skyblue;
  border-top: 2px solid skyblue;
}

.borderbottom {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 0.1rem;
}

.borderbottom::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.4rem;
  height: 0.2rem;
  border-bottom: 2px solid skyblue;
  border-right: 2px solid skyblue;
}

.mid .title .number span:nth-of-type(1) {
  width: 50%;
  text-align: center;
}

.mid .title .number span:nth-of-type(3) {
  width: 50%;
  text-align: center;
}

.mid .title .number span:nth-of-type(2) {
  height: 0.6rem;
  line-height: 1.4rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.mid .title .desc span:nth-child(1) {
  width: 50%;
  text-align: center;
}

.mid .title .desc span:nth-child(2) {
  width: 50%;
  text-align: center;
}
</style>
