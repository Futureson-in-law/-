<template>
  <div class="box">
    <div v-if="!loading">
      <transition name="van-fade">
        <div class="user-box" v-if="isVip">
          <div class="left">
            <img :src="`${userinfo.userImg}`" alt="" />
          </div>
          <div class="right">
            <div class="name">{{ userinfo.fullName }}</div>
            <router-link style="width: 100px" to="/my/vipInfo" tag="a"
              ><img src="../assets/img/pic_hangqing@2x.png"
            /></router-link>
            <span v-if="isVip.isExpiredRemind"
              >您的{{ isVip.serviceName }}已过期</span
            >
            <span v-if="!isVip.isExpiredRemind && isVip.isExpiringRemind"
              >您的{{ isVip.serviceName }}即将到期</span
            >
            <div class="btn" @click="routerVip">立即续费</div>
          </div>
        </div>
        <div class="user-box" v-else>
          <div class="left">
            <img :src="`${userinfo.userImg}`" alt="" />
          </div>
          <div class="right">
            <div class="name">{{ userinfo.fullName }}</div>
            <div class="vip-type">您暂未开通会员</div>
          </div>
        </div>
      </transition>
    </div>
    <div v-else class="user-box">
      <van-skeleton
        style="width: 100%; margin-top: 26px"
        title
        avatar
        :row="1"
      />
    </div>
    <van-cell icon="friends" title="微信客服" is-link url="/#/my/contact" />
    <van-cell icon="lock" @click="exit" title="退出登录" is-link />
    <!-- <van-cell icon="cluster" title="版本信息" :value="ver[0].val" /> -->
  </div>
</template>

<script>
import { usercenter } from "../api/common";
import { apiUrl } from "../api/api";
import ver from "../util/version";
export default {
  data() {
    return {
      userinfo: "",
      apiUrl: apiUrl,
      loading: true,
      ver: ver,
    };
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
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f2f2f2");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  async created() {
    this.userinfo = await usercenter();
    setTimeout(() => {
      this.loading = false;
    }, 600);
  },
  methods: {
    exit() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确认退出当前账号？",
        })
        .then(() => {
          this.$store.commit("clearUserInfo");
          this.$store.commit("changIndexRefresh", true);
          this.$router.replace({
            name: "login",
          });
        })
        .catch(() => {});
    },
    routerVip() {
      this.$router.push({
        name: "vip",
      });
    },
  },
};
</script>

<style lang="less">
.user-box {
  width: 100%;
  height: 120px;
  background: #fff;
  margin-bottom: 16px;
  display: flex;
  position: relative;
  .left {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .right {
    width: 275px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .name {
      width: 100%;
    }
    .vip-type {
      margin-top: 10px;
    }
    img {
      width: 100px;
      margin-top: 5px;
    }
    span {
      font-size: 12px;
      margin-top: 14px;
      color: #ff0000;
    }
    .btn {
      width: 90px;
      height: 26px;
      background: #fbd785;
      border-radius: 13px;
      font-size: 14px;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 24px;
      bottom: 24px;
    }
  }
}
.van-cell__left-icon {
  font-size: 20px !important;
  color: #999;
}
</style>