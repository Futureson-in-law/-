import { GetUserInfoByMemberId, Subscription } from './api'
import store from '../store'
export const usercenter = async () => {
    let userInfo = store.getters.getUserInfo
    let res = await GetUserInfoByMemberId({
        memberId: userInfo.memberID
    })
    return res.data
}

export const wxRecord = async (pageType) => {
    let res = await Subscription({
        pageType: pageType,
        memberID: store.getters.getUserInfo.memberID ? store.getters.getUserInfo.memberID : 0
    })
    return res
}