import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import Vip from '../views/vip'
import My from '../views/my'
import Contact from '../views/contact'
import VipInfo from '../views/vipInfo'
import Order from '../views/order'
import Oauth from '../views/oauth'
import Vipshow from '../views/vipshow'
import Index from '../views/index'
import AppInfo from '../views/guides/app-info'
import AccountInfo from '../views/guides/account-info'
import ProgramInfo from '../views/guides/program-info'
import AboutInfo from '../views/guides/about-info'
import newOffer from '../views/newOffer'
import Alerts from '../views/alerts'
import NewsList from '../views/newsList'
import newsDetail from '../views/newsDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/index',
    meta: {
      title: '首页',
      showTabbar: true,
      haveLogin: false
    },
    component: Index
  },

  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
      showTabbar: true,
      haveLogin: false
    },
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      showTabbar: false,
      haveLogin: false
    },
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '最新行情',
      showTabbar: true,
      haveLogin: false
    },
    component: Home
  },
  {
    path: '/vipshow',
    name: 'vipshow',
    meta: {
      title: '全网通会员',
      showTabbar: false,
      haveLogin: false
    },
    component: Vipshow
  },
  {
    path: '/vip',
    name: 'vip',
    meta: {
      title: '全网通会员',
      showTabbar: true,
      haveLogin: true
    },
    component: Vip
  },
  {
    path: '/my',
    name: 'my',
    meta: {
      title: '个人中心',
      showTabbar: true,
      haveLogin: true
    },
    component: My
  },
  {
    path: '/my/contact',
    name: 'contact',
    meta: {
      title: '微信客服',
      showTabbar: false,
      haveLogin: false
    },
    component: Contact
  },
  {
    path: '/my/vipInfo',
    name: 'vipInfo',
    meta: {
      title: '会员权益',
      showTabbar: false,
      haveLogin: true
    },
    component: VipInfo
  },
  {
    path: '/vip/order/:orderId',
    name: 'order',
    meta: {
      title: '我的订单',
      showTabbar: false,
      haveLogin: true
    },
    component: Order
  },
  {
    path: '/oauth',
    name: 'oauth',
    meta: {
      title: '微信授权',
      showTabbar: false,
      haveLogin: false
    },
    component: Oauth
  },
  {
    path: '/info/app',
    name: 'AppInfo',
    meta: {
      title: '下载APP',
      showTabbar: false,
      haveLogin: false
    },
    component: AppInfo
  },
  {
    path: '/info/program',
    name: 'ProgramInfo',
    meta: {
      title: '小程序',
      showTabbar: false,
      haveLogin: false
    },
    component: ProgramInfo
  },
  {
    path: '/info/account',
    name: 'AccountInfo',
    meta: {
      title: '中钢网公众号',
      showTabbar: false,
      haveLogin: false
    },
    component: AccountInfo
  },
  {
    path: '/info/about',
    name: 'AboutInfo',
    meta: {
      title: '关于我们',
      showTabbar: false,
      haveLogin: false
    },
    component: AboutInfo
  },
  {
    path: '/newOffer',
    name: 'newOffer',
    meta: {
      title: '今日报价',
      showTabbar: false,
      haveLogin: false
    },
    component: newOffer
  },
  {
    path: '/alerts',
    name: 'Alerts',
    meta: {
      title: '今日快讯',
      showTabbar: false,
      haveLogin: false
    },
    component: Alerts
  },
  {
    path: '/newsList',
    name: 'NewsList',
    meta: {
      title: '钢铁资讯',
      showTabbar: false,
      haveLogin: false
    },
    component: NewsList
  },
  {
    path: '/detail/:id',
    name: 'newsDetail',
    meta: {
      title: '新闻详情',
      showTabbar: false,
      haveLogin: false
    },
    component: newsDetail
  },
  {
    path: '*',
    redirect: '/',
    meta: {}
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
