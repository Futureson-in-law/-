<template>
  <div class="box">
    <div class="title">采购实<br />时数据</div>
    <div class="content">
      <div class="left">
        <div class="name">当前报价</div>
        <div class="num">{{ purchase.caigoucount }}</div>
      </div>
      <div class="right">
        <div class="name">当前订单量</div>
        <div class="num">{{ purchase.countcompany }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    purchase: Object,
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .title {
    min-width: 64px;
    width: 20%;
    height: 64px;
    background-image: linear-gradient(to bottom right, #ff5d00, #ffb463);
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    line-height: 22px;
  }
  .content {
    min-width: 270px;
     width: 70%;
    height: 64px;
    background: #fceedf;
    border-radius: 4px;
    display: flex;
    align-items: center;
    .left {
      width: 50%;
      height: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .num {
        font-size: 20px;
        font-weight: 500;
        color: #f63a7e;
      }
    }
    .right {
      width: 50%;
      height: 40px;
      box-sizing: border-box;
      border-left: 1px solid #bcbcbc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .num {
        font-size: 20px;
        font-weight: 500;
        color: #ff4949;
      }
    }
    .name {
      font-size: 14px;
      color: #636363;
      margin-bottom: 5px;
    }
  }
}
</style>