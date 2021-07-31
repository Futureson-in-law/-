<template>
  <div class="box">
    <div class="title">
      现在注册，立即享受7天免费<br />
      全品类行情资讯查询服务！
    </div>

    <div class="input-box">
      <img src="../assets/img/icon_zhanghao@2x.png" alt="" srcset="" />
      <van-field
        v-model="tel"
        placeholder="请输入手机号"
        type="tel"
        clearable
        size="large"
        maxlength="11"
      />
    </div>
    <div class="input-box">
      <img src="../assets/img/icon_yanzhengma@2x.png" alt="" srcset="" />
      <van-field
        v-model="sms"
        center
        type="digit"
        clearable
        size="large"
        placeholder="请输入验证码"
        maxlength="6"
      >
        <template #button>
          <van-button
            @click="sendCode"
            :disabled="tel.length != 11 || sendText != '发送验证码'"
            size="small"
            color="#FF7100"
            type="primary"
            :loading="sendLoading"
            >{{ sendText }}</van-button
          >
        </template>
      </van-field>
    </div>

    <div class="tip">未注册的手机号验证后自动创建账户</div>
    <div class="submit">
      <van-button
        :disabled="sms.length != 6"
        type="primary"
        @click="login"
        color="#FF7100"
        loading-text="登录中..."
        :loading="loginLoading"
        block
        >登录</van-button
      >
    </div>
    <div v-show="bottomShow" class="privacy" style="font-size: 12px">
      登录即表明同意<span @click="routeLink(`/hybrid/userprivacypolicy.html`)"
        >《用户服务协议》</span
      >和<span @click="routeLink(`/hybrid/privacypolicy.html`)"
        >《隐私政策》</span
      >
    </div>
  </div>
</template>

<script>
import { SendVcode, LoginByValidateCode } from "../api/api";
import { wxRecord } from "../api/common";
import { getKeys } from "../util/key";
import { Url } from "../api/api";
import commondata from "../api/commonData";
import { isWeixin } from "../util/util";
export default {
  data() {
    return {
      tel: "",
      sms: "",
      sendLoading: false,
      sendText: "发送验证码",
      loginLoading: false,
      bottomShow: true,
      originalHeight: 0, //原始高度
      screenHeight: 0, //实时高度
    };
  },
  async created() {
    let res = await wxRecord(8001);
  },
  mounted() {
    //首次进入的原始高度
    this.originalHeight = document.documentElement.clientHeight;
    window.addEventListener("resize", this.watchResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.watchResize);
  },
  watch: {
    screenHeight(newHeight) {
      //监听屏幕高度变化
      this.bottomShow = this.originalHeight <= newHeight;
    },
  },
  methods: {
    watchResize() {
      //实时变化的窗口高度
      this.screenHeight = document.documentElement.clientHeight;
    },
    async sendCode() {
      if (this.sendText != "发送验证码") return;
      this.sendLoading = true;
      let res = await SendVcode({
        mobile: this.tel,
        validateType: 6,
        keys: getKeys(),
        source: commondata.iSourceID,
      });
      if (res.result == 1) {
        this.sendText = 59;
        this.changText();
        this.sendLoading = false;
      } else {
        this.$toast(res.msg);
        this.sendLoading = false;
      }
    },
    changText() {
      let num = 59;
      let time = setInterval(() => {
        if (num <= 0) {
          this.sendText = "发送验证码";
          clearInterval(time);
        } else {
          this.sendText = --num;
        }
      }, 1000);
    },
    async login() {
      this.loginLoading = true;
      let res = await LoginByValidateCode({
        mobile: this.tel,
        validateCode: this.sms,
        source: commondata.iSourceID,
        deviceToken: "",
      });
      if (res.result > 0) {
        //本地存储用户信息
        this.$store.commit("chengeUserInfo", res.data);
        this.$store.commit("changeFirstLogin", true);
        this.$store.commit("changIndexRefresh", true);

        if (isWeixin()) {
          let openid = this.$store.getters.getOpenid;
          if (!openid || openid == null || openid == "") {
            this.$router.replace({
              path: "/oauth",
              query: {
                orderid: res.orderid,
              },
            });
          } else {
            this.$router.replace({
              path: "/index",
            });
          }
        } else {
          this.$router.replace({
            path: "/index",
          });
        }
      } else {
        this.loginLoading = false;
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
/deep/.van-cell {
  padding-left: 10px;
  border-bottom: 1px solid #d2d2d2;
}
.box {
  padding: 0 40px;
  .title {
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    line-height: 33px;
    margin-top: 60px;
  }
  .input-box {
    margin: 30px 0;
    display: flex;
    align-items: center;
  }
  .input-box img {
    width: 32px;
    height: 32px;
  }
  .tip {
    margin: 30px 0;
    color: #999999;
    font-size: 14px;
    text-align: center;
  }
  .privacy {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    span {
      color: #ff7100;
      font-size: 12px;
    }
  }
}
</style>