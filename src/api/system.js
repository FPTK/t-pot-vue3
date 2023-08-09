import service from "@/api/config";
import moment from 'moment'
export function GetSystemTime() {
    return service({
        // url:'/sysinfo/system_time/',
        // url:'/mock/time',
        method: 'post',
    })
}

export function GetSystemInfo_1() {
    return service({
        url: '/sysinfo/system_overview/',
        method: 'post'
    })
}

export function GetDiskInfo() {
    return service({
        url: '/sysinfo/storage_data/',
        // url:'/mock/disk_info',
        method: 'post'
    })
}


export function GetReportInfo(params) {
    let now_Day = moment(new Date()).format("YYYY-MM-DD") //获取今天的日期
    let time = params["time"]
        //如果选择的是全部时间
    if (time[0] === 'all') {
        time[0] = "2021-11-30"
        time[1] = moment(new Date()).format("YYYY-MM-DD")
    }

    params["time"] = time

    return service({
        url: '/kibana/search_test/',
        // url:'/mock/report',
        method: 'post',
        data: params
    })
}

// leftchart4图表所用查询，查询攻击者所输入的用户名，并统计数量
export function UsernameData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'd').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
        // console.log(time);
    var params = {}
    params["time"] = time

    return service({
        url: '/kibana/search_usernameData/',
        method: 'post',
        data: params
    })
}

// rightChart2图表所用数据，统计1天内攻击者来源国家的数量
export function CountryData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'd').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
        // console.log(time);
    var params = {}
    params["time"] = time

    return service({
        url: '/kibana/search_countryData/',
        method: 'post',
        data: params
    })
}

// rightChart3图表所用数据，统计1天内攻击者来源IP的数量
export function IpData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'd').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
        // console.log(time);
    var params = {}
    params["time"] = time

    return service({
        url: '/kibana/search_ipData/',
        method: 'post',
        data: params
    })
}

// leftchart3 rightchart1图表所用查询，查询1天之内蜜罐受到攻击的统计数据
export function HoneypotData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'd').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
        // console.log(time);
    var params = {}
    params["time"] = time

    return service({
        url: '/kibana/search_honeypotData/',
        method: 'post',
        data: params
    })
}

//  攻击大屏中今日攻击次数所用查询，查询本日攻击次数
export function HoneypotDayData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'd').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
        // console.log(time);
    var params = {}
    params["time"] = time

    return service({
        url: '/kibana/search_honeypotData/',
        method: 'post',
        data: params
    })
}


// leftchart1 图表所用查询，查询蜜罐一周被攻击次数
export function HoneypotWeekData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'w').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
        // console.log(time);
    var params = {}
    params["time"] = time
    return service({
        url: '/kibana/search_honeypotAttackData/',
        method: 'post',
        data: params
    })
}

// midchart1 图表所用数据，查询1年中每个月攻击数量
export function HoneypotMonthAttackData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'y').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
    var params = {}
    params["time"] = time
    return service({
        url: '/kibana/search_honeypotMonthAttackData/',
        method: 'post',
        data: params
    })
}

// 地图所用查询，查询1周时间内攻击来源经纬度，并统计每个经纬度的攻击数量
export function SessionCollapseData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'w').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
        // console.log(time);
    var params = {}
    params["time"] = time
    return service({
        url: '/kibana/search_sessionCollapseData/',
        method: 'post',
        data: params
    })
}

// 态势感知中实时攻击所用查询，查询当前时间蜜罐所受攻击的实时数据
export function RTAData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
        // console.log(time);
    var params = {}
    params["time"] = time
    return service({
        url: '/kibana/search_RTAData/',
        method: 'post',
        data: params
    })
}

// leftchart2图表所用查询，查询1天之内BehaviorClass和RiskClass中每个分类的数量
export function BehaviorClassData() {
    let time = [];
    var gte = moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD");
    let lte = moment(new Date()).format("YYYY-MM-DD");
    time = [gte, lte]
        // console.log(time);
    var params = {}
    params["time"] = time
    return service({
        url: '/kibana/search_BehaviorClassData/',
        method: 'post',
        data: params
    })
}
// export function getHoneyPot