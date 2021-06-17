<template>
  <div class="box">
    <van-nav-bar
      :left-arrow="true"
      title="下载APP"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <div class="content">
      <img src="../../assets/img/logo_zgw@2x.png" />
      <p>把握行情走势，查询真实现货</p>
      <p>汇集最新钢材报价，免费在线锁货，全方位采购服务</p>
      <div class="down" @click="down">下载APP</div>
    </div>
  </div>
</template>

<script>
import { downapp } from "../../util/downapp";
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    down() {
      downapp();
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 240px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 5px solid #f2f2f2;
  img {
    width: 60px;
    height: 60px;
  }
  p {
    font-size: 14px;
    color: #333333;
    margin-top: 16px;
  }
  .down {
    width: 109px;
    height: 37px;
    background: #ffffff;
    border-radius: 19px;
    border: 1px solid #ff7100;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #ff7100;
    margin-top: 20px;
  }
}
</style>