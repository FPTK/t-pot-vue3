import axios from 'axios'


const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    // “/” 为使用mock时的开发环境，“dev-api"为真正的开发环境
    // baseURL:'/',
    baseURL: '/dev-api',
    timeout: 20000
})

service.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)


service.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)


export default service