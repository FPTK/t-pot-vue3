/**
 login界面的逻辑函数
 **/

import { ref, reactive, toRaw } from 'vue'
import { captcha, Login, Login_mock } from "@/api/login";
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router'
import { useStore } from "vuex";

export default function login_page() {
    const router = useRouter()
    const LoginFormRef = ref()
    const store = useStore()


    const loginForm = reactive({
        username: 'zsq',
        password: 'zsqzsq',
        captcha: '',
    })

    //控制显示获取验证码按钮以及验证码div
    const captcha_button_display = ref(true)

    let base_path

    // 开发环境和上线环境
    if (process.env.NODE_ENV === 'development') {
        // base_path = 'http://127.0.0.1'
        base_path = 'http://192.168.86.135'
    } else {
        base_path = ''
    }
    //图片路径
    const img_path = ref(base_path + "/static/captcha/captcha.jpeg")

    // console.log(img_path)
    //初始化验证码
    function init_captcha() {
        LoginFormRef.value.validate((valid) => {
            if (valid) {
                const { username, password } = loginForm
                captcha({ username: username, password: password }).then(res => {
                    //验证码获取失败
                    const { data } = res
                    if (data.status === 'false') {
                        ElMessage({
                            message: data.exception,
                            type: 'error',
                        })
                    }
                    //验证码获取成功
                    else {
                        captcha_button_display.value = false
                        img_path.value = base_path + data["captcha"]
                    }
                })
            }
        })
    }

    //更新验证码
    function change_captcha() {
        LoginFormRef.value.validate((valid) => {
            if (valid) {
                const { username, password } = loginForm
                captcha({ username: username, password: password }).then(res => {
                    //验证码获取失败
                    const { data } = res
                    if (data.status === 'false') {
                        ElMessage({
                            message: data.exception,
                            type: 'error',
                        })
                    }
                    //验证码获取成功
                    else {
                        img_path.value = base_path + data["captcha"] + '?randomid=' + Math.random()
                    }
                })
            }
        })
    }

    //登录(服务器测试)
    function login() {
        LoginFormRef.value.validate((valid) => {
            if (valid) {
                const info = toRaw(loginForm)
                Login(info).then(res => {
                    //如果验证码输入错误，返回202，如果输入正确则返回200
                    let type = ref()
                    if (res.status === 202) {
                        ElMessage({
                            type: 'error',
                            message: res.data
                        })
                        loginForm.captcha = ''
                    }
                    if (res.status === 200) {
                        ElMessage({
                            type: 'success',
                            message: res.data
                        })
                        router.push('/')
                    }
                })
            }
        })
    }


    //登录(本地测试)
    function login_mock() {
        LoginFormRef.value.validate((valid) => {
            if (valid) {
                const info = toRaw(loginForm)
                Login_mock(info).then(res => {
                    //如果验证码输入错误，返回202，如果输入正确则返回200
                    store.commit('permisson/SET_TOKEN', res.data.token)
                        // console.log(store.getters)
                    let type = ref()
                    if (res.status === 202) {
                        ElMessage({
                            type: 'error',
                            message: res.data
                        })
                        loginForm.captcha = ''
                    }
                    if (res.status === 200) {
                        ElMessage({
                            type: 'success',
                            message: res.data
                        })
                        router.push('/')
                    }
                })
            }
        })
    }

    function resetLoginForm() {
        LoginFormRef.value.resetFields()
    }

    return {
        loginForm,
        LoginFormRef,
        img_path,
        captcha_button_display,
        init_captcha,
        change_captcha,
        login,
        login_mock,
        resetLoginForm
    }
}