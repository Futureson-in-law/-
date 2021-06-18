<template>
  <div class="box">
    <div class="info" v-if="pageData">
      <div class="number">订单编号：{{ pageData.orderNo }}</div>
      <div class="type">{{ pageData.title }}</div>
      <div class="title">待支付金额</div>
      <div class="price">
        ￥<span>{{ pageData.dueAmount }}</span>
      </div>
    </div>
    <div class="info" v-else>
      <van-skeleton
        style="width: 90%; margin: 0 auto; margin-top: 26px"
        title
        :row="2"
      />
    </div>
    <div class="pay-select">
      <van-radio-group v-model="radio">
        <van-cell-group icon="location-o">
          <van-cell icon="wechat-pay" title="微信支付" clickable>
            <template #right-icon>
              <van-radio checked-color="#FF7100" name="1" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="pay-btn">
      <van-button
        @click="pay"
        :disabled="!pageData.id"
        color="#FF7100"
        type="primary"
        block
        >确认支付</van-button
      >
    </div>
    <!-- <div class="pay-box">
      <img :src="'data:image/jpeg;base64,' + payQr" alt="" />
    </div> -->
  </div>
</template>

<script>
import {
  GetOrderInfo,
  AdvancePayment,
  wxAppID,
  IncludeWXJS,
  AdvancePaymentForJS,
  SearchPayResultByOrderID,
} from "../api/api";
import { wxRecord } from "../api/common";
import { isWeixin } from "../util/util";
export default {
  beforeRouteLeave(to, form, next) {
    clearInterval(this.inter);
    next();
  },
  data() {
    return {
      radio: "1",
      pageData: "",
      payQr: "",
      code: "",
      inter: "",
    };
  },
  async created() {
    this.OrderInfo();
    this.wxConfig();
    await wxRecord(8004);
    if (this.$store.getters.getH5payReturn) {
      this.$store.commit("changH5payRetrun", false);
      this.PayResult();
    }
  },
  methods: {
    async OrderInfo() {
      let res = await GetOrderInfo({
        iHQOrderID: this.$route.params.orderId,
        iMemberID: this.$store.getters.getUserInfo.memberID,
      });
      this.pageData = res.data;
    },
    async pay() {
      if (!isWeixin()) {
        this.H5pay();
        return;
      }
      let openid = this.$store.getters.getOpenid;
      if (!openid || openid == null || openid == "") {
        this.$dialog
          .alert({
            title: "温馨提示",
            message: "登录信息已过期，请重新登录",
            theme: "round-button",
          })
          .then(() => {
            this.$store.commit("changIndexRefresh", true);
            this.$store.commit("clearUserInfo");
            this.$router.replace({
              name: "login",
            });
          });
      }
      try {
        await wxRecord(8005);
      } catch (error) {}
      let { data } = await AdvancePaymentForJS({
        openId: this.$store.getters.getOpenid,
        orderId: this.pageData.id,
        payStyle: 4,
      });
      let that = this;
      this.$wx.chooseWXPay({
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        package: data.package,
        signType: "RSA",
        paySign: data.sign,
        success: function (res) {
          that.$dialog
            .alert({
              title: "温馨提示",
              message: "支付成功",
              theme: "round-button",
            })
            .then(async () => {
              that.$store.commit("changIndexRefresh", true);
              that.$router.push({ name: "home", replace: true });
              try {
                await wxRecord(8006);
              } catch (error) {}
            });
        },
      });
    },
    async getAdvancePayment() {
      let res = await AdvancePayment({
        orderId: this.pageData.id,
        payStyle: 1,
      });
      if (res.result == 1) {
        return res.data;
      } else {
        this.$toast(res.msg);
        return false;
      }
    },
    async wxConfig() {
      let url = window.location.href;
      let res = await IncludeWXJS({
        url: url,
      });
      this.$wx.config({
        debug: false,
        appId: wxAppID,
        timestamp: res.data.timestamp, // 时间戳
        nonceStr: res.data.noncestr, // 随机字符串
        signature: res.data.sign, // 签名
        jsApiList: [
          "onMenuShareTimeline", // 分享到朋友圈接口
          "onMenuShareAppMessage", //  分享到朋友接口
          "chooseWXPay", //支付接口
        ],
      });
    },
    async H5pay() {
      let res = await this.getAdvancePayment();
      this.$store.commit("changH5payReturn", true);
      window.location.href = res;
    },
    PayResult() {
      let that = this;
      this.inter = setInterval(async () => {
        let res = await SearchPayResultByOrderID({
          orderID: this.$route.params.orderId,
          payStyle: 2,
        });
        if (res.data.payStatus == 1) {
          clearInterval(this.inter);
          that.$dialog
            .alert({
              title: "温馨提示",
              message: "支付成功",
              theme: "round-button",
            })
            .then(async () => {
              that.$store.commit("changIndexRefresh", true);
              that.$router.push({ name: "home", replace: true });
              try {
                await wxRecord(8006);
              } catch (error) {}
            });
        }
      }, 1000);
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
};
</script>

<style lang="less" scoped>
.info {
  width: 100%;
  height: 168px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #3a3a3a;
    line-height: 30px;
  }
  .price {
    color: #ff0000;
    font-weight: 600;
    span {
      font-size: 32px;
      line-height: 45px;
    }
  }
}
.pay-select {
  margin-top: 8px;
}
/deep/.van-icon-wechat-pay {
  color: #09bb07;
  font-size: 24px;
}
/deep/.van-icon-shopping-cart {
  color: #1472ff;
  font-size: 24px;
}
.pay-btn {
  width: 340px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>