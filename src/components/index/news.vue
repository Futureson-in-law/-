<template>
  <div class="box">
    <div class="left">
      <img src="../../assets/img/icon-jinri@2x.png" alt="" srcset="" />
    </div>
    <div class="center">
      <div class="content" @click="changeRouter('/')">
        <van-swipe
          autoplay="3000"
          :touchable="false"
          :show-indicators="false"
          style="height: 45px"
          vertical
        >
          <van-swipe-item
            style="display: flex; align-items: center"
            v-for="(item, index) of items"
            :key="index"
            ><span class="text">{{
              titleSub(item.title)
            }}</span></van-swipe-item
          >
        </van-swipe>
      </div>
    </div>
    <div class="right">
      <img src="../../assets/img/icon-tiaozhuan@2x.png" />
    </div>
  </div>
</template>

<script>
import { GetTodayNewsArticleList } from "../../api/api";
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.TodayNewsArticleList();
  },
  methods: {
    titleSub(text) {
      return String(text).substring(0, 34) + "..";
    },
    changeRouter(router) {
      this.$toast("即将上线，敬请期待");
      // this.$router.push({
      //   path: router,
      // });
    },
    async TodayNewsArticleList() {
      let res = await GetTodayNewsArticleList({
        memberId: 0,
        itemId: 99,
        pageIndex: 1,
        pageSize: 8,
      });
      this.items = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 68px;
  border-top: 1px solid #f2f2f2;
  border-bottom: 8px solid #f2f2f2;
  display: flex;
  align-items: center;
  .left {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 28px;
    }
  }
  .center {
    width: 255px;
    height: 45px;
    border-left: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 100%;
      height: 44px;
      box-sizing: border-box;
      padding-left: 20px;
      display: flex;
      align-items: center;
      .text {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .right {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 24px;
    }
  }
}
</style>