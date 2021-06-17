<template>
  <div>
    <a class="kefu" @click="open">
      <img src="../assets/img/btn_kefu@2x.png" alt="" srcset="" />
    </a>
    <van-popup
      closeable
      close-icon="close"
      position="bottom"
      round
      v-model="show"
      get-container="#app"
    >
      <div class="alert">
        <!-- <div class="row row1">
          <img src="../assets/img/icon_boda@2x.png" alt="" srcset="" />
          <div class="text">{{ phone }}</div>
          <a :href="`tel:${phone}`"
            ><van-button color="#FF7100" plain type="primary" size="small"
              >拨打电话</van-button
            ></a
          >
        </div> -->

        <div class="row row1">
          <img src="../assets/img/icon_weixin@2x.png" alt="" srcset="" />
          <div class="text">{{ wxs[0] }}</div>
          <van-button
            @click="copy(wxs[0])"
            color="#FF7100"
            plain
            type="primary"
            size="small"
            >添加微信</van-button
          >
        </div>
        <div class="row">
          <img src="../assets/img/icon_weixin@2x.png" alt="" srcset="" />
          <div class="text">{{ wxs[1] }}</div>
          <van-button
            @click="copy(wxs[1])"
            color="#FF7100"
            plain
            type="primary"
            size="small"
            >添加微信</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import commondata from "../api/commonData";
import { isWeixin } from "../util/util";
export default {
  data() {
    return {
      wxs: commondata.wxs,
      phone: commondata.phone,
      show: false,
    };
  },

  methods: {
    open() {
      if (isWeixin()) {
        this.show = true;
      } else {
        window.location.href =
          "https://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=1489475&configID=238550&jid=1222560049&s=1";
      }
    },
    copy(text) {
      this.$copyText(text).then(
        (e) => {
          this.$dialog.alert({
            message: "您已成功复制中钢网客服微信\n" + text,
          });
        },
        (e) => {}
      );
    },
  },
};
</script>
<style lang="less" scoped>
.kefu {
  position: fixed;
  right: 20px;
  bottom: 140px;
  width: 48px;
  img {
    width: 60px;
  }
}
.alert {
  width: 100%;
  height: 180px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  .row {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
      margin-left: 50px;
    }
    .text {
      display: block;
      width: 140px;
      padding-left: 16px;
      font-size: 16px;
    }
  }
  .row1 {
    margin-bottom: 20px;
  }
}
</style>