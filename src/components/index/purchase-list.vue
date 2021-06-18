<template>
  <div class="box">
    <div class="title">
      <div class="text">最新采购消息</div>
    </div>
    <div class="list">
      <van-swipe
        autoplay="4000"
        :show-indicators="false"
        :touchable="false"
        vertical
      >
        <van-swipe-item v-for="(item, index) of listData" :key="index">
          <div
            @click="changeRouter"
            class="item"
            v-for="(oitem, oindex) of item"
            :key="oindex"
          >
            <strong></strong> {{ oitem.pm }} <span></span> {{ oitem.cz
            }}<span></span> {{ oitem.gg }} <span></span> {{ oitem.ton }}吨
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    changeRouter() {
      this.$toast("可通过中钢网官网 \nwww.zgw.com \n查看更多信息");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-swipe {
  height: 120px;
}
.title {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 18px;
  box-sizing: border-box;
  .text {
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    color: #ff6824;
    border-bottom: 2px solid #ff6824;
  }
}
.list {
  height: 140px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 18px;
  .item {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    span {
      padding: 0 5px;
    }
    strong {
      width: 5px;
      height: 5px;
      background: #ff6824;
      margin-right: 8px;
      margin-left: 2px;
    }
  }
}
</style>