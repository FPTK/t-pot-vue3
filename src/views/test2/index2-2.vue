<template>
  <button @click="getUsernameData">用户名词云</button>
  <button @click="getCountryData">攻击城市top10</button>
  <button @click="getIpData">来源IP top10</button>
  <button @click="getHoneypotData">被攻击蜜罐统计信息</button>
  <!-- <button @click="getAttackDirection">攻击分类数据</button> -->
  <button @click="getHoneypotAttackData">7天攻击数据</button>
  <button @click="getHoneypotMonthAttackData">一年攻击数据</button>
  <button @click="getSessionCollapseData">collapse测试</button>
  <button @click="getRTAData">RTAData测试</button>
  <button @click="getBehaviorClassData">BehaviorClassData测试</button>
</template>

<script>
import {
  UsernameData,
  CountryData,
  IpData,
  HoneypotData,
  HoneypotMonthAttackData,
  SessionCollapseData,
  RTAData,
  BehaviorClassData,
} from "@/api/system";
import { onMounted, reactive, getCurrentInstance, watch } from "vue";

export default {
  name: "test2-2",
  setup() {
    const { proxy } = getCurrentInstance();

    const getUsernameData = () => {
      UsernameData().then((res) => {
        console.log(res);
      });
    };

    const getCountryData = () => {
      CountryData().then((res) => {
        console.log(res);
      });
    };

    const getIpData = () => {
      IpData().then((res) => {
        console.log(res);
      });
    };

    const getHoneypotData = () => {
      HoneypotData().then((res) => {
        console.log(res);
      });
    };



    const getHoneypotMonthAttackData = () => {
      HoneypotMonthAttackData().then((res) => {
        console.log(res);
      });
    };

    const getSessionCollapseData = () => {
      SessionCollapseData().then((res) => {
        dataProcess(res);
      });
    };

    const getRTAData = () => {
      RTAData().then((res) => {
        console.log(res);
      });
    };

    const getBehaviorClassData = () => {
      BehaviorClassData().then((res) => {
        console.log(res);
      });
    };

    const dataProcess = (res) => {
      var buckets = res.data.aggregations.filter_agg.tongji.buckets;
      console.log(buckets);
      var BJData = [];
      var MapData = {};
      MapData["北京"] = [116.4551, 40.2539];
      for (var i = 0; i < buckets.length; i++) {
        var temp = [];
        var temp2 = {};
        var temp3 = {};
        var temp4 = [];
        temp[0] = buckets[i].loc.location.lon;
        temp[1] = buckets[i].loc.location.lat;
        temp2.name = "" + i + "";
        temp2.value = buckets[i].loc.count;
        temp3.name = "北京";
        temp4[0] = temp2;
        temp4[1] = temp3;
        BJData[i] = temp4;
        MapData["" + i + ""] = temp;
      }
      console.log(MapData);
      console.log(BJData);
    };
    return {
      getUsernameData,
      getCountryData,
      getIpData,
      getHoneypotData,
      // getAttackDirection,
      // getHoneypotAttackData,
      getHoneypotMonthAttackData,
      getSessionCollapseData,
      dataProcess,
      getRTAData,
      getBehaviorClassData,
    };
  },
};
</script>


<style scoped>
</style>