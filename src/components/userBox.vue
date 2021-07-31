<template>
  <div style="height: 115px">
    <div class="bg"></div>
    <div class="title-box" v-if="userinfo">
      <div class="user-img">
        <img :src="userinfo.userImg" alt="" />
      </div>
      <div class="info">
        <div class="name">{{ userinfo.fullName }}</div>
        <div v-if="isVip" class="type">{{ isVip.serviceName }}</div>
        <div v-else class="type" style="color: #666">您暂未开通会员</div>
        <div
          v-if="!isVip.isExpiredRemind && isVip.isExpiringRemind"
          class="message"
        >
          您的{{ isVip.serviceName }}即将到期
        </div>
      </div>
      <div class="btn" v-if="isbtn && isVip">
        <a @click="route('/my/vipInfo')">查看权益</a>
      </div>
    </div>
    <div class="title-box" v-else>
      <van-skeleton
        style="width: 100%; margin-top: 14px"
        title
        avatar
        :row="1"
      />
    </div>
  </div>
</template>

<script>
import { usercenter } from "../api/common";
export default {
  props: {
    isbtn: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isVip() {
      if (this.userinfo) {
        let hqServiceList = this.userinfo.hqMemberInfo.hqServiceList;
        for (let index = 0; index < hqServiceList.length; index++) {
          const element = hqServiceList[index];
          if (element.isVip) {
            return element;
          }
        }
        return false;
      }
    },
  },
  data() {
    return {
      userinfo: "",
    };
  },
  created() {
    this.getUserCenter();
  },
  methods: {
    async getUserCenter() {
      let res = await usercenter();
      this.userinfo = res;
    },
    route(url) {
      if (this.$route.query.source) {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          window.webkit.messageHandlers.look.postMessage();
        } else if (navigator.userAgent.match(/android/i)) {
          window.webCall.look();
        }
      } else {
        this.$router.push({
          path: url,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bg {
  height: 105px;
  width: 100%;
  background: #2d3251;
}
.title-box {
  width: 340px;
  height: 100px;
  border-radius: 14px;
  margin: 0 auto;
  margin-top: -85px;
  background: #f1dac0 url("../assets/img/pic_vip@2x.png") no-repeat 230px 50px;
  background-size: 100px;
  display: flex;
  .user-img {
    width: 60px;
    display: flex;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
      margin-top: 20px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .info {
    width: 200px;
    padding: 16px 0 0 16px;
    box-sizing: border-box;
    .name {
      font-size: 18px;
      color: #333333;
      font-weight: 600;
      line-height: 25px;
    }
    .type {
      font-size: 12px;
      color: #ff0000;
      line-height: 20px;
    }
    .message {
      font-size: 12px;
      color: #333333;
      line-height: 20px;
    }
  }
  .btn {
    width: 80px;
    display: flex;
    align-items: center;
    a {
      width: 70px;
      height: 28px;
      background: #f77b00;
      border-radius: 19px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 12px;
    }
    a:active {
      opacity: 0.8;
    }
  }
}
</style>
