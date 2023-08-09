// import Mock from 'mockjs'

export default {
    //接收时间作为参数返回报表信息
    GetReport: params => {
        /*

        {'brute_force': {'number': 21, 'ip_rank': {'192.168.4.121': 21}, 'percent': '24.14%'},
        'suspicious_connection': {'number': 53, 'ip_rank': {'192.168.4.121': 53}, 'percent': '60.92%'},
        'abnormal_behavior': {'number': 13, 'ip_rank': {'192.168.4.121': 13}, 'percent': '14.94%'},
         'size': {'mssql': 6, 'rdp': 2, 'postgresql': 8, 'smb': 10, 'mysql': 6, 'ssh': 24, 'adb': 4, 'ftp': 23, 'telnet': 2, 'socks': 6}}
         */
        var time = JSON.parse(params.body)
        console.log(time)
        var info = {
            time: ["2021-01-01", "2021-03-03"],
            attack_total_number: 104,
            Attack_type_direction: {
                brute_force: {
                    number: 21,
                    percent: '24.14%',
                    cn_name: "暴力破解"
                },
                suspicious_connection: {
                    number: 53,
                    percent: '60.92%',
                    cn_name: "可疑连接"
                },
                abnormal_behavior: {
                    number: 13,
                    percent: '14.94%',
                    cn_name: "异常行为"
                },
                max_number_cn_name: "可疑连接"
            },
            System_operation: {
                running_days: 84
            },
            Attack_level: {
                high: {
                    number: 2000,
                    cn_name: "高危",
                    percent: '33.33%'
                },
                mid: {
                    number: 2000,
                    cn_name: "中危",
                    percent: '60%'
                },
                low: {
                    number: 2000,
                    cn_name: "低危",
                    percent: '25%'
                },
                max_number_level_cn_name: "低危"
            },
            Attack_ip: {
                Attack_ip_total_rank: {
                    '192.168.4.50': 50,
                    '192.168.4.97': 47,
                    '192.168.4.122': 42,
                    '192.168.4.133': 39,
                    '192.168.4.134': 36,
                    '192.168.4.152': 30,
                    '192.168.4.76': 25,
                },
                max_number_ip: '192.168.4.50'
            },
            Attack_service: {
                number: 10,
                service_rank: {
                    'mssql': 50,
                    'rdp': 45,
                    'postgresql': 43,
                    'smb': 40,
                    'mysql': 36,
                    'ssh': 32,
                    'adb': 30,
                    'ftp': 25,
                    'telnet': 20,
                    'socks': 10
                },
                max_number_service: 'mssql'
            },
        }
        return info
    }
}