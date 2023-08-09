export const Rules = {
    username: [
        {
            required: true,
            message: '请输入登录名'
        },
        {
            min: 3,
            max: 50,
            message: '长度在3到5个字符',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码'
        },
        {
            min: 3,
            max: 50,
            message: '长度在3到5个字符',
            trigger: 'blur'
        }
    ]
    // captcha: [
    //     {
    //         required: true,
    //         message: '请输验证码'
    //     }
    // ]
}