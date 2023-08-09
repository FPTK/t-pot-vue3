import service from "@/api/config";

export function captcha(params) {
    return service({
        url: '/userinfo/get_captcha/',
        method: 'post',
        data: params
    })
}

export function Login(params) {
    return service({
        url: '/userinfo/check_userinfo/',
        method: 'post',
        data: params
    })
}

// 本地测试登录
export function Login_mock(params) {
    return service({
        url: '/mock/login_mock',
        method: 'post',
        data: params
    })
}

// 本地测试获取菜单
export function Route_mock(params) {
    return service({
        url: '/mock/route',
        method: 'post',
        data: params
    })
}

// 本地测试退出
export function Logout_mock(){
    return service({
        url:'/mock/logout_mock',
        method:'post'
    })
}