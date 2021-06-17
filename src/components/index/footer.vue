<template>
  <div class="box">
    <div class="href">
      <router-link to="/info/app">手机版</router-link>
      <router-link to="/info/program">小程序版</router-link>
      <router-link to="/info/account">公众号</router-link>
      <router-link to="/info/about">关于我们</router-link>
    </div>
    <div class="phone">全国咨询/投诉电话：400-700-8508</div>
    <div class="record">豫ICP备 14018983号</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100px;
  border-top: 8px solid #f2f2f2;
  padding-top: 10px;
  .href {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    a {
      color: #363636;
      font-size: 14px;
    }
  }
  .phone {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff6824;
    font-size: 14px;
  }
  .record {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    font-size: 14px;
  }
}
</style>