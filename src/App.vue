<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <van-tabbar
      active-color="#FF5959"
      inactive-color="#636363"
      route
      :placeholder="true"
      v-show="$route.meta.showTabbar && $store.state.tabbar"
    >
      <van-tabbar-item replace to="/index" icon="wap-home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/home" icon="hot">最新行情</van-tabbar-item>
      <van-tabbar-item replace to="/vip" icon="diamond"
        >全网通会员</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="manager"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import mixUmeng from "@/mixins/mixUmeng";
export default {
  mixins: [mixUmeng],
};
</script>
<style lang="less" scoped>
</style>