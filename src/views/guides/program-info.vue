<template>
  <div class="box">
    <van-nav-bar
      :left-arrow="true"
      title="钢小秘"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <div class="content">
      <img src="../../assets/img/logo_zgw_mini@2x.png" alt="" srcset="" />
      <p>钢小秘个人版</p>
      <div class="down">
        {{ isWeixin ? "长按二维码识别" : "长按二维码保存" }}
      </div>
      <p>平台引流、企业宣传、员工传播，<br />三重推广助力卖货翻番！</p>
      <p>访客数据、在线订单、客户资料，<br />实效管理为您卖货护航！</p>
    </div>
    <div class="tips">
      如何操作？<br />
      1.{{ isWeixin ? "长按二维码识别" : "长按二维码保存" }}<br />
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
  height: 340px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 5px solid #f2f2f2;
  img {
    width: 100px;
    height: 100px;
  }
  p {
    font-size: 14px;
    color: #333333;
    margin-top: 16px;
    text-align: center;
    line-height: 20px;
  }
  .down {
    width: 140px;
    height: 37px;
    background: #ffffff;
    border-radius: 19px;
    // border: 1px solid #ff7100;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #ff7100;
    margin-top: 10px;
  }
}
.tips {
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  padding: 0 30px;
  font-size: 13px;
  margin-top: 20px;
}
</style>