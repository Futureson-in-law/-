import md5 from 'md5'
const _ = require('lodash')
import commondata from "../api/commonData"
export const chengCategoryList = list => {
    if (list.length == 0) {
        return [{
            text: '暂无信息',
            value: -1
        }]
    }
    for (let item in list) {
        list[item]['text'] = list[item]['TypeName'];
        list[item]['value'] = list[item]['SteelTypeId'];
        delete list[item]['TypeName']
        delete list[item]['SteelTypeId']
    }
    return list
}
export const chengTimeList = list => {
    if (list.length == 0) {
        return [{
            text: '暂无信息',
            value: -1
        }]
    }
    for (let item in list) {
        list[item]['text'] = list[item]['PriceTime'];
        list[item]['value'] = list[item]['PriceTime'];
        delete list[item]['PriceTime']
    }
    return list
}
export const getToken = (vue) => {
    let Time = new Date().getTime()
    let From = commondata.iSourceID
    let FromPass = "Subscribe"
    let StringT = "webapp(%+(-A/#*-C^%!.$)"
    let RequestNo = _.random(5000)
    return {
        Time,
        From,
        RequestNo,
        Token: md5(String(Time) + String(FromPass) + String(RequestNo) + String(StringT))
    }
}
export const isWeixin = () => {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}
export const changeTime = (e) => {
    let month = e.getMonth() < 10 ? "0" + (e.getMonth() + 1) : e.getMonth();
    let date = e.getDate() < 10 ? "0" + e.getDate() : e.getDate();
    let year = e.getFullYear()
    return year + "-" + month + "-" + date;
}
