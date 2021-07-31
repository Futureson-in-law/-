<template>
  <div class="contact">
    <strong>获取更多权益请联系中钢网客服</strong>
    <div class="content">
      <a :href="`tel:${phone}`">
        <img
          style="margin-right: 10px"
          src="../assets/img/btn_dadianhua@2x.png"
        />
      </a>
      <img @click="copy" src="../assets/img/btn_weixin@2x.png" />
    </div>
  </div>
</template>

<script>
import commondata from "../api/commonData";
export default {
  name: "contact",
  data() {
    return {
      wx: commondata.wx,
      phone: commondata.phone,
    };
  },
  methods: {
    copy() {
      this.$copyText(this.wx).then(
        (e) => {
          console.log(e);
          this.$dialog.alert({
            message: "您已成功复制中钢网客服微信\n" + this.wx,
          });
        },
        (e) => {}
      );
    },
  },
};
</script>

<style lang="less" scoped>
.contact {
  width: 100%;
  min-height: 120px;
  strong {
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    box-sizing: border-box;
    padding-left: 18px;
    font-size: 14px;
  }
  .content {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 168px;
      display: block;
    }
  }
}
</style>
