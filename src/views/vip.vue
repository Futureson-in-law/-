<template>
  <div class="box" style="background: #f2f2f2">
    <userBox />
    <div v-if="pageData && user">
      <img
        v-if="isCanRecvInvalid"
        class="vouchers"
        src="../assets/img/pic_youhuiquan@2x.png"
        @click="receive"
      />
      <div class="vip-title">全网通超级会员套餐</div>
      <transition name="van-fade">
        <div class="package" v-show="pageData">
          <!-- <div
        class="item"
        :class="item == 1 ? 'item-active' : ''"
        v-for="item of 4"
        :key="item"
      >
        <div class="name">建材会员</div>
        <div class="price">￥<span>1980</span>/年</div>
        <div class="btn">立即升级</div>
      </div> -->
          <div
            class="item-ts"
            :class="{
              'item-active': priceIndex == index,
            }"
            v-for="(item, index) in Available"
            :key="item.id"
            @click="selectItem(index)"
          >
            <img
              v-if="index == 1"
              class="item-tuijian"
              src="../assets/img/pic_tuijian@2x.png"
            />
            <div class="name">{{ item.serviceName }}</div>
            <div class="price">
              ￥<span>{{ item.price }}</span
              >/年
            </div>
          </div>
        </div>
      </transition>
      <!-- <div class="tip">建材会员：不限地区不限设备，实时查看最新行情</div> -->
      <div class="pay-box">
        <van-button
          :disabled="!checked"
          color="#FBD785"
          size="large"
          @click="submit"
          >{{ isVip ? "立即续费" : "立即开通" }}</van-button
        >
      </div>
      <div class="check-box">
        <van-checkbox v-model="checked" checked-color="rgb(255, 89, 89)"
          >已阅读并同意</van-checkbox
        ><span @click="routeLink(`/hybrid/HqAgr.html`)"
          >《全网通超级会员协议》</span
        >
      </div>

      <iframe
        class="video-vip"
        src="//player.bilibili.com/player.html?aid=803736610&bvid=BV1Uy4y1T7Dt&cid=356353234&page=1&high_quality=1&danmaku=0"
        scrolling="no"
        border="0"
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      >
      </iframe>
      <van-image
        style="display: block"
        v-for="item of introducePicAPP"
        :key="item"
        :src="item"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <service />
    <placeholder />
  </div>
</template>

<script>
import userBox from "../components/userBox";
import placeholder from "../components/placeholder";
import service from "../components/service";
import { GetHqServiceByMemberID, MakeOrder, ReceiveVoucher } from "../api/api";
import { usercenter, wxRecord } from "../api/common";
import { Url } from "../api/api";
import commondata from "../api/commonData";
export default {
  components: {
    userBox,
    placeholder,
    service,
  },
  computed: {
    Available() {
      return this.pageData.filter(function (item) {
        return item.isAvailable == 0;
      });
    },
    isCanRecvInvalid() {
      let couponList =
        this.user.hqMemberInfo.couponList.length > 0
          ? this.user.hqMemberInfo.couponList
          : [];
      return (
        couponList[0] &&
        couponList[0].isCanRecv == 1 &&
        couponList[0].isInvalid == 0 &&
        couponList[0].isReceived == 0
      );
    },
    isVip() {
      if (this.user) {
        let hqServiceList = this.user.hqMemberInfo.hqServiceList;
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
      pageData: "",
      user: "",
      priceIndex: 0,
      checked: false,
      introducePicAPP: [],
    };
  },
  async created() {
    if (this.$route.query.source) {
      this.$store.commit("changTabbar", false);
    }
    this.getusercenter();
    this.HqServiceByMemberID();
    try {
      await wxRecord(8003);
    } catch (error) {}
  },
  beforeDestroy() {
    this.$store.commit("changTabbar", true);
  },
  methods: {
    async HqServiceByMemberID() {
      let res = await GetHqServiceByMemberID({
        iMemberID: this.$store.getters.getUserInfo.memberID,
        isTY: false,
      });
      this.pageData = res.data;
      this.introducePicAPP = res.data[0].introducePicAPP;
    },
    async getusercenter() {
      let user = await usercenter();
      this.user = user;
    },
    selectItem(index) {
      this.priceIndex = index;
      let list = this.Available;
      this.introducePicAPP = list[index].introducePicAPP;
    },
    async submit() {
      let list = this.Available;
      let item = list[this.priceIndex];
      let iSourceID = commondata.iSourceID;
      //移动端使用支付落地页
      if (this.$route.query.source) {
        iSourceID = this.$route.query.source === "ios" ? 2 : 3;
        let res = await this.getMakeOrder(iSourceID, item);
        if (res.result == 1) {
          if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            window.webkit.messageHandlers.getOrder.postMessage({
              orderId: res.orderid,
              name: item.serviceName,
            });
          } else if (navigator.userAgent.match(/android/i)) {
            window.webCall.getOrder(res.orderid, item.serviceName);
          }
        } else {
          this.$toast(res.msg);
        }
      } else {
        let res = await this.getMakeOrder(iSourceID, item);
        if (res.result == 1) {
          this.$router.push({
            name: "order",
            params: { orderId: res.orderid },
          });
        } else {
          this.$toast(res.msg);
        }
      }
    },
    async getMakeOrder(iSourceID, item) {
      let res = await MakeOrder({
        iSourceID: iSourceID,
        iMemberID: this.$store.getters.getUserInfo.memberID,
        strServiceID: item.id,
      });
      return res;
    },

    async receive() {
      let data = this.user.hqMemberInfo.couponList[0];
      let res = await ReceiveVoucher({
        iSource: commondata.iSourceID,
        iMemberID: this.$store.getters.getUserInfo.memberID,
        iCouponBatchID: data.id,
      });
      if (res.result == 1) {
        this.$dialog
          .alert({
            title: "温馨提示",
            message: `领取成功`,
          })
          .then(() => {
            this.$router.push({
              name: "vipInfo",
            });
          });
      } else {
        this.$toast(res.msg);
      }
    },
    routeLink(url) {
      window.location.href = Url + url;
    },
  },
};
</script>

<style lang="less" scoped>
.vouchers {
  width: 320px;
  display: block;
  border: 0;
  margin: 10px auto;
}
.video-vip {
  width: 100%;
  margin-bottom: 16px;
}
.vip-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 18px;
  margin: 0 auto;
  margin-top: 30px;
  width: 360px;
  background: #fff;
  padding-bottom: 16px;
  padding-top: 24px;
  padding-left: 20px;
  box-sizing: border-box;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.package {
  width: 360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  background: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  .item {
    width: 130px;
    height: 130px;
    border-radius: 8px;
    border: 2.5px solid #dddddd;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .name {
      font-size: 18px;
      color: #333333;
      font-weight: bold;
    }
    .price {
      font-size: 12px;
      color: #666666;
      margin: 8px 0;

      span {
        font-size: 26px;
        font-weight: 500;
        color: #c07f30;
      }
    }
    .btn {
      width: 73px;
      height: 20px;
      background: #d9c292;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #ffffff;
      border-radius: 10px;
    }
  }

  .item-ts {
    width: 29%;
    height: 110px;
    border-radius: 8px;
    border: 2px solid #dddddd;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    flex-direction: column;
    position: relative;
    .name {
      font-size: 18px;
      color: #333333;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .price {
      font-size: 12px;
      color: #666666;
      margin: 0px 16px;
      display: flex;
      align-items: center;
      width: 110px;
      justify-content: center;
      span {
        font-size: 26px;
        font-weight: 500;
        color: #c07f30;
      }
    }
    .btn {
      width: 73px;
      height: 30px;
      background: #d9c292;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #ffffff;
      border-radius: 20px;
    }
  }
  .item-tuijian {
    width: 42px;
    height: 42px;
    top: -1px;
    left: -1px;
    position: absolute;
  }
  .item-active {
    border-color: #f77b00;
    background: url("../assets/img/btn_xuanzhongkuang@2x.png") no-repeat bottom
      right;
    background-size: 26px 26px;
  }
}
.tip {
  text-align: center;
  margin: 16px 0;
  font-size: 14px;
}
/deep/.van-button--default {
  color: #555 !important;
  font-weight: 600;
}
.pay-box {
  width: 350px;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 10px;
}
.check-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  span {
    color: #c07f30;
  }
}
</style> 