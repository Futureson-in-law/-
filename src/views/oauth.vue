<template>
  <div></div>
</template>

<script>
import { GetUserOpenID, wxAppID } from "../api/api";
export default {
  data() {
  },
  created() {
    this.getCode();
  },
  methods: {
    async getCode() {
      let local = window.location.href;
      let appid = wxAppID;
      let code = this.getUrlCode().code;
      if (!code || code == null || code == "") {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_base&#wechat_redirect`;
      } else {
        let res = await GetUserOpenID({
          code: code,
        });
        if (res.result == 1) {
          this.$store.commit("changeOpenid", res.data.openid);
          window.location.href = "/#/";
        }
      }
    },
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      this.winUrl = url;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
  },
};
</script>

<style lang="less" scoped>
</style>