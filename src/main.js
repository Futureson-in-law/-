import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'reset-css'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/common.less'
import _ from 'lodash'
import wx from 'weixin-js-sdk'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)


Vue.prototype._ = _
Vue.prototype.$wx = wx

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (!to.meta.haveLogin) {
    next()
  }
  else {
    if (!store.getters.getUserInfo || store.getters.getUserInfo == null || store.getters.getUserInfo.length == 0) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
