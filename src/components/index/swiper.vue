<template>
  <div class="box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        style=""
        class="banner-box"
        v-for="(item, index) of list"
        :key="index"
      >
        <img
          class="banner"
          @click="routeLink(item)"
          :src="item.ImgUrl"
          alt=""
          srcset=""
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { GetNewsBannerListZMS, AddAdvertClickLog } from "../../api/api";
export default {
  data() {
    return {
      list: [],
    };
  },
  async created() {
    let { data } = await GetNewsBannerListZMS();
    this.list = data;
  },
  methods: {
    async routeLink(item) {
      if (item.HttpUrl == "#") return;
      let memberID = this.$store.state.userInfo.memberID || 0;
      await AddAdvertClickLog({
        sAdvertID: item.sAdvertID,
        memberId: memberID,
      });
      window.location.href = item.HttpUrl;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 90%;
  height: 160px;
  margin: 0px auto;
  margin-top: 10px;
  overflow: hidden;
}
/deep/.van-swipe {
  height: auto;
}
.banner {
  width: 100%;
}
.banner-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
}
</style>