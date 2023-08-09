<template>

  <div class="login-container">
    <div class="login-box">

      <div class="avatar-box">
        <img src="../../assets/logo.png" alt="">
      </div>

      <el-form :model="loginForm" ref="LoginFormRef" class="login-form"
               label-width="0px" :rules="rules">


        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="user">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" show-password prefix-icon="lock">
          </el-input>
        </el-form-item>

        <el-form-item v-if="!captcha_button_display" prop="captcha">
          <el-row>
            <el-col :span="23">
              <el-input v-model="loginForm.captcha" style="margin-top: 10px" clearable/>
            </el-col>
            <el-col :span="1">
              <img :src="img_path" style="margin-left: 10px" @click="change_captcha">
            </el-col>
          </el-row>

        </el-form-item>

        <div class="login-btns">
          <!--          可不可以在用户注册完毕后就直接生成对应的验证码的地址-->
          <el-button type="primary" v-if="captcha_button_display" @click="init_captcha">获取验证码</el-button>
<!--          <el-button type="primary" @click="login_mock" >登录</el-button>-->
          <el-button type="primary" @click="login" :disabled="captcha_button_display">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import {Rules} from './rules'
import login_page from "@/views/login/login";
import {onBeforeRouteLeave} from 'vue-router'
import {useStore} from 'vuex'
export default {
  name: "index",
  setup() {

    const store = useStore()
    const {
      loginForm, LoginFormRef, img_path, captcha_button_display, init_captcha,
      change_captcha, login, resetLoginForm ,login_mock
    } = login_page()

    return {
      loginForm,
      LoginFormRef,
      img_path,
      captcha_button_display,
      rules: Rules,
      init_captcha,
      change_captcha,
      login,
      login_mock,
      resetLoginForm
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #2b5b6b;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.login-btns {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>