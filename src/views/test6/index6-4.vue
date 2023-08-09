<template>
  三方联动
</template>

<script>
import axios from "axios";
import {GetDiskInfo, GetSystemTime} from "@/api/system";

export default {
  name: "index6-4",
  setup(){
    //定义了Promise就会立即执行，使用then方法分别指定resolved和rejected状态的回调函数
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("resolve传递参数")
      }, 1000)
    }).then((res) => {
      console.log("我是第一步" + res)
      return Promise.resolve(res + "11")
    }).then((data) => {
      console.log("我是第二步" + data)
    })

    axios.all([
      GetSystemTime(),
      GetDiskInfo(),
    ]).then((res=>{
      console.log(res)
    }))

    const getJSON = function(url) {
      const promise = new Promise(function(resolve, reject){
        const handler = function() {
          console.log(this)
          //this就是client
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };
        const client = new XMLHttpRequest();
        client.open("post", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

      });

      return promise;
    };
    getJSON('/mock/time')

    console.log('---------------')

    console.log(GetDiskInfo())


    const p1 = new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('fail')), 3000)
    })

    const p2 = new Promise(function (resolve, reject) {
      setTimeout(() => resolve(p1), 1000)
    })

    p2.then((result)=>{
      console.log(result)
    }).catch((error)=>{
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>