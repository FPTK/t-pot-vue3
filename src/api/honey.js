import service from "@/api/config";

// 获取当前所有蜜罐容器的信息
export function Docker_Container() {
    return service({
        url: '/honey/docker_container/',
        method: 'post'
    })
}

export function Docker_Image(){
    return service({
        url:'/honey/docker_images/',
        method:'post'
    })
}


export function Container_Pause(params){
    return service({
        url:'/honey/docker_container_pause/',
        method:'post',
        data:params
    })
}

export function Container_Start(params){
    return service({
        url:'/honey/docker_container_start/',
        method:'post',
        data:params
    })
}

export function Container_Delete(params){
    return service({
        url:'/honey/docker_container_delete/',
        method:'post',
        data:params
    })
}

export function Container_Count(){
    return service({
        url:'/honey/docker_stats/',
        method:'post'
    })
}

