<template>
  <div class="box">
    <van-grid :border="false" :column-num="3">
      <van-grid-item to="/newOffer">
        <img class="icon" src="../../assets/img/icon-baojia@2x.png" />
        <div class="text">今日报价</div>
      </van-grid-item>
      <van-grid-item to="/home">
        <img class="icon" src="../../assets/img/icon-hangqing@2x.png" />
        <div class="text">最新行情</div>
      </van-grid-item>
      <van-grid-item to="/newsList">
        <img class="icon" src="../../assets/img/icon-hetong@2x.png" />
        <div class="text">钢铁资讯</div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  methods: {
    showGX() {
      this.$toast("即将上线，敬请期待");
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  .icon {
    width: 64px;
    margin-bottom: 2px;
  }
  .text {
    font-size: 14px;
  }
}
</style>