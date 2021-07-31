import { get, post } from './http'

export const apiUrl = "https://appv2servicet.zgw.com/api"
// export const apiUrl = "https://appv2services.zgw.com/api"

export const Url = "https://appv2servicet.zgw.com"
// export const Url = "https://appv2services.zgw.com"

export const wxAppID = "wxe807d760920ee99e"
//个人中心相关

/** 
 *[post]
 *验证码登录
 */
export const LoginByValidateCode = (params) => {
    return post(apiUrl + "/Account/LoginByValidateCode", params)
}
/** 
 *[post]
 *发送验证码
 */
export const SendVcode = (params) => {
    return post(apiUrl + "/Account/SendVcode", params)
}

/** 
 *[get]
 *根据用户id获取用户信息
 */
export const GetUserInfoByMemberId = (params) => {
    return get(apiUrl + "/Account/GetUserInfoByMemberId", params)
}

//首页相关
/** 
 *[get]
 *获取城市
 */
export const GetHqCityList = (params) => {
    return get(apiUrl + "/MarketQuotations/GetHqCityList", params)
}
/** 
 *[get]
 *公众号-根据城市ID获取对应品类列表
 */
export const GetSteelTypeListByCityId = (params) => {
    return get(apiUrl + "/MarketQuotations/GetSteelTypeListByCityId", params)
}
/** 
 *[get]
 *公众号-根据城市ID和品类ID获取对应日期列表
 */
export const GetSelectTimeList = (params) => {
    return get(apiUrl + "/MarketQuotations/GetSelectTimeList", params)
}
//公众号-获取首页banner集合
export const GetBannerList = (params) => {
    return get(apiUrl + "/MarketQuotations/GetBannerList", params)
}
//公众号-wap端最新行情
export const GetWapNewPriceList = (params) => {
    return post(apiUrl + "/MarketQuotations/GetWapNewPriceList", params)
}
//今日快讯
export const GetTodayNewsArticleList = (params) => {
    return get(apiUrl + "/QuoteNews/GetTodayNewsArticleList", params)
}
//行情会员相关
//获取套餐内容及会员开通信息
export const GetHqServiceByMemberID = (params) => {
    return get(apiUrl + "/QuoteFee/GetHqServiceByMemberID", params)
}
//行情会员下单
export const MakeOrder = (params) => {
    return post(apiUrl + "/QuoteFee/MakeOrder", params)
}
//获取订单信息
export const GetOrderInfo = (params) => {
    return get(apiUrl + "/QuoteFee/GetOrderInfo", params)
}
//调起支付
export const AdvancePayment = (params) => {
    return post(apiUrl + "/WeChatPay/AdvancePayment", params)
}
//领取体验券、自动激活为行情会员
export const ReceiveVoucher = (params) => {
    return post(apiUrl + "/QuoteFee/ReceiveVoucher", params)
}
//获取支付者的OPENID
export const GetUserOpenID = (params) => {
    return post(apiUrl + "/WeChatPay/GetUserOpenID", params)
}
//引入微信JS需要的签名和数据
export const IncludeWXJS = (params) => {
    return post(apiUrl + "/WeChatPay/IncludeWXJS", params)
}
//JS获取调起支付数据
export const AdvancePaymentForJS = (params) => {
    return post(apiUrl + "/WeChatPay/AdvancePaymentForJS", params)
}
//记录用户操作数据
export const Subscription = (params) => {
    return post(apiUrl + "/Search/Subscription", params)
}
//根据订单号查询支付状态
export const SearchPayResultByOrderID = (params) => {
    return get(apiUrl + "/WeChatPay/SearchPayResultByOrderID", params)
}
//获取采购实时数据和最新采购信息
export const GetCaigouIndexList = (params) => {
    return get(apiUrl + "/Product/GetCaigouIndexList", params)
}
// 今日报价
export const GetTodayQuotePriceList = (params) => {
    return post(apiUrl + `/MarketQuotations/GetTodayQuotePriceList?pageIndex=${params.pageIndex}&pageSize=20`, params)
}
//根据NewsGuid获取新闻详情
export const GetArticleDetail = (params) => {
    return get(apiUrl + "/Master/GetArticleDetail", params)
}
//各个资讯列表页——1个List集合
export const GetNewsIndexList = (params) => {
    return get(apiUrl + "/Master/GetNewsIndexList", params)
}
//获取主页banner图
export const GetNewsBannerListZMS = (params) => {
    return get(apiUrl + "/MarketQuotations/GetNewsBannerListZMS", params)
}
/** 
 *[post]
 *手机app、wap添加点击广告事件记录
 */
export const AddAdvertClickLog = (params) => {
    return post(apiUrl + "/Master/AddAdvertClickLog", params)
}

// 采购订单列表
export const GetCaiGouList = (parame) => {
    return get(apiUrl + '/CaiGou/GetCaiGouList', parame)
}

// 采购订单详情
export const GetSelectiveOrderDetailByCgId = (parame) => {
    return get(apiUrl + '/PushOrder/GetSelectiveOrderDetailByCgId', parame)
}

// 获取钢厂
export const GetProductAreaList = (parame) => {
    return get(apiUrl + '/CaiGou/GetProductAreaList', parame)
}

// 获取省份城市
export const GetCityByFid = (parame) => {
    return get(apiUrl + '/EnterPrise/GetCityByFid', parame)
}

// 提交采购单订单报价
export const AddQuotedPrice = (parame) => {
    return post(apiUrl + '/PushOrder/AddQuotedPrice', parame)
}

// 撤销采购单订单报价
export const CancelQuotedPrice = (parame) => {
    return post(apiUrl + '/PushOrder/CancelQuotedPrice', parame)
}

// 获取采购通品类等等..
export const GetCaiGouDefaultData = (parame) => {
    return get(apiUrl + '/CaiGou/GetCaiGouDefaultData', parame)
}