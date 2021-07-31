<template>
  <div class="box">
    <div class="left">
      <img class="logo" src="../../assets/img/logo.png" alt="" />
      <div class="title">手机中钢网</div>
    </div>
    <div class="right">
      <router-link tag="div" to="/info/app" class="btn ts">
        <img src="../../assets/img/phone.png" alt="" srcset="" />
        <div>中钢网APP</div>
      </router-link>
      <router-link tag="div" to="/my" class="btn">
        <img src="../../assets/img/ren.png" alt="" srcset="" />
        <div>{{ islogin ? "个人中心" : "注册/登录" }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      islogin: false,
    };
  },
  created() {
    if (
      this.$store.getters.getUserInfo &&
      this.$store.getters.getUserInfo.mobile
    ) {
      this.islogin = true;
    }
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 54px;
  background: #ff6824;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 70px;
    margin-left: 10px;
  }
  .title {
    font-size: 16px;
    color: #ffffff;
    margin-left: 8px;
  }
  .btn {
    width: 75px;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    img {
      width: 24px;
      margin-bottom: 2px;
    }
    div {
      color: #fff;
      font-size: 10px;
    }
  }
}
</style>