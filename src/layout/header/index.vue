<template>
  <header>

    <div class="l-content">
      花镜欺骗诱捕系统
    </div>

    <div class="r-content">


      <change-color/>

<!--      选择任意颜色的颜色选择器-->
<!--      <div style="margin-right: 10px">-->
<!--        <color-picker/>-->
<!--      </div>-->

      <save_link/>
      <avatar/>
    </div>
  </header>

</template>

<script>
import avatar from "@/layout/header/component/avatar";
import ChangeColor from "@/layout/header/component/changeColor";
import ColorPicker from "@/layout/header/component/ColorPicker";
import Save_link from "@/layout/header/component/Save_link";
export default {
  name: "index",
  components: {
    Save_link,
    ColorPicker,
    ChangeColor,
    avatar,
  }
}
</script>

<style lang="scss" scoped>
header {
  //设置flex布局，可以使元素横向布局
  display: flex;
  height: 100%;
  padding-left: 0;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 15px;
}

.l-content {
  display: flex;
  align-items: center;


  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  display: flex;
  align-content: center; //对齐内容
  align-items: center; //对齐项目
}
</style>