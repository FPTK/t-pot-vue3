import service from "@/api/config";
export const getHistoryData = () => {
    return service({
        url:'/mock/data',
        method:'post'
    })
}

export const getNowData = () => {
    return service({
        url:'/mock/data_now',
        method:'post'
    })
}

export const getData = ()=>{
    return service({
        url:'/mock/get_data',
        method:'post'
    })
}