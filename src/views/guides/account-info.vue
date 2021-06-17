<template>
  <div class="box">
    <van-nav-bar
      :left-arrow="true"
      title="中钢网公众号"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <div class="content">
      <img src="../../assets/img/logo_zgw_qr@2x.png" alt="" srcset="" />
      <p>每日更新钢材价格、钢材行情分析、钢材市场涨跌资讯</p>
      <div class="down">{{ isWeixin ? "长按图片识别" : "长按图片保存" }}</div>
    </div>
    <div class="tips">
      如何操作？<br />
      1.{{ isWeixin ? "长按二维码图片识别" : "长按二维码图片保存" }}<br />
      2.通过微信识别二维码即可进入公众号
    </div>
  </div>
</template>

<script>
import { isWeixin } from "../../util/util";
export default {
  data() {
    return {
      isWeixin: isWeixin(),
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
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
    width: 90px;
    height: 90px;
  }
  p {
    font-size: 14px;
    color: #333333;
    margin-top: 20px;
  }
  .down {
    width: 140px;
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
.tips {
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  padding: 0 20px;
  font-size: 13px;
  margin-top: 20px;
}
</style>