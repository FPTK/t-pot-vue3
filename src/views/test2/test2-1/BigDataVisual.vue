<template>
  <div>
    <div class="header">
      <h1>花境欺骗诱捕系统</h1>
      <div class="showtime">当前时间为：{{ nowTime }}</div>
      <div class="logo">华境安全</div>
      <div class="tsgz">
        <el-dropdown>
          <span class="el-dropdown-link">
            攻击大屏
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link :to="{ path: '/Trend' }" class="route"
                  >态势感知
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item></el-dropdown-item>
              <el-dropdown-item></el-dropdown-item>
              <el-dropdown-item disabled></el-dropdown-item>
              <el-dropdown-item divided></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="charts">
      <div class="mid">
        <!-- 中间上面的数字模块 -->
        <div class="title" style="font-family: electronicFont">
          <div class="number">
            <div class="borderTop"></div>
            <span>{{ todayAttack }}</span>
            <span></span>
            <span>{{ totalAttack }}</span>
            <div class="borderbottom"></div>
          </div>
          <div class="desc">
            <span>今日攻击次数</span>
            <span>总攻击次数</span>
          </div>
        </div>
        <!-- 中间下面的地图模块 -->
        <Map></Map>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "./Map";
import { ArrowDown } from "@element-plus/icons-vue";
import { onBeforeUnmount } from "vue";
import { HoneypotMonthAttackData, HoneypotDayData } from "@/api/system";

export default {
  name: "test1",
  data: function () {
    return {
      nowTime: "",
      todayAttack: "",
      totalAttack: "",
      timer1: null,
      timer2: null,
      timer3: null
    };
  },
  components: {
    Map,
    ArrowDown,
  },
  beforeCreate: () => {
    document.getElementsByTagName("html")[0].className = "add_html";
    document.getElementsByTagName("body")[0].className = "add_body";
    // document.querySelector('#app').style.height = 0;
    document.querySelector("#app").className = "add_app";
  },
  mounted() {
    if (this.timer1) {
      clearInterval(this.timer1);
    } else {
      this.timer1 = setInterval(() => {
        this.nowTime = this.getNowTime();
      }, 1000);
    }
    this.getHoneypotMonthAttackData();
    this.getHoneypotDayAttackData();
    if (this.timer2) {
      clearInterval(this.timer2);
    } else {
      this.timer2 = setInterval(() => {
        this.getHoneypotMonthAttackData();
      }, 2000);
    }
    if (this.timer3) {
      clearInterval(this.timer3);
    } else {
      this.timer3 = setInterval(() => {
        this.getHoneypotDayAttackData();
        // console.log(333);
      }, 2000);
    }
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

    async getHoneypotMonthAttackData() {
      var res = await HoneypotMonthAttackData();
      var buckets = res.data.aggregations.tongji.buckets;
      var sum = 0;
      for (var i = 0; i < buckets.length; i++) {
        sum += buckets[i].doc_count;
      }
      // console.log(sum);
      this.totalAttack = sum;
    },

    async getHoneypotDayAttackData() {
      var res = await HoneypotDayData();
      var buckets = res.data.aggregations.tongji.buckets;
      // console.log(buckets);
      var sum = 0;
      for (var i = 0; i < buckets.length; i++) {
        sum += buckets[i].doc_count;
      }
      // console.log(sum);
      this.todayAttack = sum;
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
    if (this.timer1 || this.timer2 || this.timer3) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer1);
      clearInterval(this.timer2);
      clearInterval(this.timer3); //关闭
      console.log("Interval clear");

      this.timer1 = null;
      this.timer2 = null;
      this.timer3 = null;
    }
  },
};
</script>

<style>
.add_html {
  font-size: calc(100vw / 24);
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

<style scoped>
.header {
  width: 100%;
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

.tsgz {
  position: absolute;
  left: 1.75rem;
  top: 20%;
  height: 0.5rem;
  line-height: 0.2rem;
  /* margin-top: 0.25rem; */
  font-size: 0.25rem;
}

.route {
  text-decoration: none;
  font-size: 0.2rem;
  color: black;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  font-size: 0.25rem;
  height: 0.2rem;
}

/* header下面的大盒子样式 */
.charts {
  flex: 1;
  width: 100%;
  height: 90vh;
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
  justify-content: space-evenly;
}

.charts .leftMid {
  /* flex将左中右三个盒子按3:5:3划分 */
  display: flex;
  flex-direction: row;
  /* 下面两个样式分别实现将左侧盒子中的图表垂直排列并且均匀分布在盒子中 */
  justify-content: space-evenly;
  height: 3rem;
  position: relative;
}

.charts .leftMid1 {
  display: flex;
  flex: 1.5;
  flex-direction: row;
  justify-content: space-evenly;
  height: 3rem;
  position: relative;
  padding: 0rem 0.2rem 0rem 0rem;
}

.charts .leftMid2 {
  display: flex;
  flex: 1.5;
  flex-direction: row;
  justify-content: space-evenly;
  height: 3rem;
  position: relative;
  padding: 0rem 0rem 0rem 0.2rem;
}

.charts .mid {
  flex: 5;
}

.charts .right {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.mid .title {
  margin: 0rem 0.1rem 0rem 0.1rem;
  padding: 0.2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: 0.5px solid #3386da; */
  background: rgba(101, 132, 226, 0.2);
  width: 99%;
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