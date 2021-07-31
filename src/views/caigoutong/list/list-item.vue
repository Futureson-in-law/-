<template>
  <div class="box" @click="href">
    <div class="state">
      <template v-if="itemData.sign != ''">
        <van-tag
          v-for="(item, index) of itemData.sign.split(',')"
          :key="index"
          type="primary"
          style="margin-right: 10px"
          color="#FF7100"
          size="large"
          >{{ item }}</van-tag
        >
      </template>
    </div>
    <div class="title">{{ itemData.description }}</div>
    <div class="location">收货地&nbsp;&nbsp;{{ itemData.deliveryArea }}</div>
    <div class="time">
      <div class="left">{{ itemData.sAddDate }}发布</div>
      <div class="right" v-if="['待报价', '比价中'].includes(itemData.result)">
        剩余<span>01</span>天<span>12</span>时<span>23</span>分
      </div>
    </div>
    <div
      class="order-state"
      :class="{
        'order-state-compare': itemData.result == '比价中',
        'order-state-other': ['已截止', '被退回', '已撤销', '未中标'].includes(
          itemData.result
        ),
      }"
    >
      {{ itemData.result }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: Object,
  },
  data() {
    return {};
  },
  methods: {
    href() {
      this.$router.push({
        name: "Cgdetail",
        params: { id: this.itemData.cgId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 360px;
  min-height: 130px;
  height: auto;
  background: #fff;
  margin: 12px auto;
  border-radius: 4px;
  padding: 10px 16px;
  box-sizing: border-box;
  position: relative;
  .state {
    padding-bottom: 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #020202;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 260px;
    line-height: 21px;
    min-height: 20px;
  }
  .location {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    margin-bottom: 10px;
  }
  .time {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666666;
    span {
      color: red;
    }
  }
  .order-state {
    width: 68px;
    height: 26px;
    background: #30bf00;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: absolute;
    right: 12px;
    top: 26px;
    font-size: 14px;
    color: #ffffff;
  }
  .order-state-compare {
    background: #ff7100;
  }
  .order-state-other {
    background: #a4a4a4;
  }
}
</style>