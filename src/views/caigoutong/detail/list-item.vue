<template>
  <div class="box">
    <div class="box-top">
      <div class="title">
        {{ itemData.pm }} {{ itemData.cz }} {{ itemData.gg }}
      </div>
      <div class="ton">采购量：{{ itemData.ton }} 吨</div>
      <div class="place">产地/厂家：{{ itemData.productArea }}</div>
      <div class="btn" @click="open">立即报价</div>
    </div>
    <div class="info-box" v-if="itemData.baoJiaInfo">
      <div class="row">
        <div class="col">钢厂：沙钢</div>
        <div class="col">河南省-郑州市-管城回族区</div>
      </div>
      <div class="row">
        <div class="col">报价：3512元/吨</div>
        <div class="col">运费 500元</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: Object,
    index: Number,
  },
  data() {
    return {};
  },
  methods: {
    open() {
      this.$emit("open",this.index);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 360px;
  margin: 0 auto;
  margin-top: 10px;
  min-height: 108px;
  border-radius: 4px;
  overflow: hidden;
}
.box-top {
  width: 100%;
  min-height: 108px;
  background: #fff;
  padding: 14px 16px;
  box-sizing: border-box;
  position: relative;
  .title {
    font-size: 14px;
    font-weight: 600;
    color: #020202;
    margin-top: 6px;
  }
  .ton {
    font-size: 14px;
    color: #020202;
    margin-top: 12px;
  }
  .place {
    .ton;
  }
  .btn {
    width: 72px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #ff7100;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff7100;
    position: absolute;
    right: 20px;
    top: 40px;
    font-size: 14px;
  }
}
.info-box {
  width: 100%;
  height: 68px;
  background: #ff7100;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  .row {
    width: 100%;
    display: flex;
    padding: 0 16px;
    .col {
      color: #fff;
      width: 50%;
      height: 24px;
      display: flex;
      align-items: center;
      font-size: 13px;
    }
  }
}
</style>
