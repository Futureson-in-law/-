import Vue from 'vue'
import Vuex from 'vuex'
import localstorage from '../util/localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    firstLogin: false,//用户第一次登录
    openid: "",//记录用户openid 减少公众号Code获取次数
    indexRefresh: false,//首页数据是否需要自动刷新
    H5payReturn: false,//H5支付情况下是否需要回调查询
    loginReturn: ''//登录后返回的页面
  },
  getters: {
    getUserInfo(state) {
      try {
        state.userInfo = localstorage.get('userinfo')
      } catch (error) {
      }
      return state.userInfo
    },
    getOpenid(state) {
      try {
        state.openid = localstorage.get('openid')
      } catch (error) {
      }
      return state.openid
    },
    getFirstLogin(state) {
      try {
        state.firstLogin = localstorage.get('firstLogin')
      } catch (error) {
      }
      return state.firstLogin
    },
    getIndexRefresh(state) {
      try {
        state.indexRefresh = localstorage.get('indexRefresh')

      } catch (error) {
      }
      return state.indexRefresh
    },
    getH5payReturn(state) {
      try {
        state.H5payReturn = localstorage.get('H5payReturn')
      } catch (error) {
      }
      return state.H5payReturn
    },
    getLoginReturn(state) {
      try {
        state.loginReturn = localstorage.get('loginReturn')
      } catch (error) {
      }
      return state.loginReturn
    }
  },
  mutations: {
    chengeUserInfo(state, userInfo) {
      state.userInfo = userInfo
      try {
        localstorage.set('userinfo', userInfo)
      } catch (e) {
        console.log(e);
      }
    },
    changeOpenid(state, openid) {
      state.openid = openid
      try {
        localstorage.set('openid', openid)
      } catch (e) {
        console.log(e);
      }
    },
    clearUserInfo(state) {
      state.userInfo = null
      try {
        localStorage.clear();
      } catch (e) {
        console.log(e);
      }
    },
    changeFirstLogin(state, val) {
      state.firstLogin = val
      try {
        localstorage.set('firstLogin', val)
      } catch (e) {
        console.log(e);
      }
    },
    changIndexRefresh(state, val) {
      state.indexRefresh = val
      try {
        localstorage.set('indexRefresh', val)
      } catch (e) {
        console.log(e);
      }
    },
    changH5payReturn(state, val) {
      state.H5payReturn = val
      try {
        localstorage.set('H5payReturn', val)
      } catch (e) {
        console.log(e);
      }
    },
    changLoginReturn(state, val) {
      state.loginReturn = val
      try {
        localstorage.set('loginReturn', val)
      } catch (e) {
        console.log(e);
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
