import {reactive, ref} from 'vue'
import moment from 'moment'

let oneMinute = 60 * 1000;
let now1 = new Date();

function getZero(num) {
    // 单数前面加0
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

export default {
    get_History_Data() {
        let now = new Date();
        let data1 = []
        let value = Math.random() * 1000;


        function randomData() {
            now = new Date(+now - oneMinute);
            value = value + Math.random() * 21 - 10;
            return {
                name: now.toString(),
                value: [
                    [now.getFullYear(), now.getMonth(), now.getDate()].join('/') +
                    ' ' +
                    [
                        getZero(now.getHours()),
                        getZero(now.getMinutes()),
                        getZero(now.getSeconds())
                    ].join(':'),
                    Math.round(value)
                ]
            };
        }

        for (var i = 0; i < 10; i++) {
            data1.unshift(randomData());
        }
        return data1
    },

    get_Now_Data() {
        let data1 = []
        let value = Math.random() * 1000;

        function randomData() {
            now1 = new Date(+now1 + oneMinute);
            value = value + Math.random() * 21 - 10;
            return {
                name: now1.toString(),
                value: [
                    [now1.getFullYear(), now1.getMonth(), now1.getDate()].join('/') +
                    ' ' +
                    [
                        getZero(now1.getHours()),
                        getZero(now1.getMinutes()),
                        getZero(now1.getSeconds())
                    ].join(':'),
                    Math.round(value)
                ]
            };
        }

        for (var i = 0; i < 10; i++) {
            data1.unshift(randomData());
        }
        return data1
    },

    getData() {
        const time = moment(new Date()).format("YYYY/MM/DD HH:mm")
        const value = Math.ceil(Math.random() * 1000)
        return {
            value:[
                time,value
            ]
        }
    }

}