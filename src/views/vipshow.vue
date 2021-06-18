<template>
  <div class="box">
    <div class="box-zz"></div>
    <div class="bg"></div>
    <div v-if="pageData">
      <!-- <img
        v-if="isCanRecvInvalid"
        class="vouchers"
        src="../assets/img/pic_youhuiquan@2x.png"
        @click="receive"
      /> -->
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
            :class="{ 'item-active': priceIndex == index }"
            v-for="(item, index) in Available"
            :key="item.id"
            @click="selectItem(index)"
          >
            <div class="name">{{ item.serviceName }}</div>
            <div class="price">
              ￥<span>{{ item.price }}</span
              >/年
            </div>
            <div class="btn">立即升级</div>
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
    this.HqServiceByMemberID();
  },
  methods: {
    async HqServiceByMemberID() {
      let res = await GetHqServiceByMemberID({
        iMemberID: 0,
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
      this.$store.commit("changLoginReturn", "vip");
      this.$toast(`登录后才可以开通哦，即将前往登录···`);
      let time = setTimeout(() => {
        clearTimeout(time);
        this.$router.push({
          name: "login",
        });
      }, 1500);
      return;
      let list = this.Available;
      let item = list[this.priceIndex];
      let res = await MakeOrder({
        iSourceID: commondata.iSourceID,
        iMemberID: this.$store.getters.getUserInfo.memberID,
        strServiceID: item.id,
      });
      if (res.result == 1) {
        this.$router.push({
          name: "order",
          params: { orderId: res.orderid },
        });
      } else {
        this.$toast(res.msg);
      }
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
.bg {
  height: 45px;
  width: 100%;
  background: #2d3251;
}
.vouchers {
  width: 320px;
  display: block;
  border: 0;
  margin: 10px auto;
}
.vip-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 18px;
  margin-top: 30px;
}
.package {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .item {
    width: 130px;
    height: 130px;
    border-radius: 8px;
    border: 2.5px solid #dddddd;
    margin-bottom: 20px;
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
    width: 340px;
    height: 65px;
    border-radius: 8px;
    border: 2px solid #dddddd;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    .name {
      font-size: 18px;
      color: #333333;
      font-weight: bold;
      text-align: right;
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