<template>
  <div class="box">
    <van-nav-bar
      :left-arrow="true"
      title="今日快讯"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <div class="time-box">
      <div class="deta">2021年05月24日</div>
      <div class="item-box">
        <div class="time">18:53</div>
        <div class="text">24日MTI进口矿石指数748</div>
        <div class="share-box">
          <div class="share" @click="share">
            <img src="../assets/img/icon-fenxiang@2x.png" alt="" /> 转发
          </div>
        </div>
      </div>
      <div class="item-box" :class="{ 'item-box-last': true }">
        <div class="time">18:53</div>
        <div class="text">
          24日调价：下午唐山普方坯降20，本地部分钢厂及昌黎部分钢厂出厂报3590，现金含税。
        </div>
        <div class="share-box">
          <div class="share">
            <img src="../assets/img/icon-fenxiang@2x.png" alt="" /> 转发
          </div>
        </div>
      </div>
    </div>
    <div class="time-box">
      <div class="deta">2021年05月24日</div>
      <div class="item-box">
        <div class="time">18:53</div>
        <div class="text">24日MTI进口矿石指数748</div>
        <div class="share-box">
          <div class="share">
            <img src="../assets/img/icon-fenxiang@2x.png" alt="" /> 转发
          </div>
        </div>
      </div>
      <div class="item-box" :class="{ 'item-box-last': true }">
        <div class="time">18:53</div>
        <div class="text">
          24日调价：下午唐山普方坯降20，本地部分钢厂及昌黎部分钢厂出厂报3590，现金含税。
        </div>
        <div class="share-box">
          <div class="share">
            <img src="../assets/img/icon-fenxiang@2x.png" alt="" /> 转发
          </div>
        </div>
      </div>
    </div>

    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="shareOptions"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showShare: false,
      shareOptions: [
        { name: "微信", icon: "wechat" },
        { name: "朋友圈", icon: "wechat-moments" },
        { name: "QQ", icon: "qq" },
        { name: "复制链接", icon: "link" },
      ],
    };
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f2f2f2");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  methods: {
    share() {
      this.showShare = true;
    },
    onSelect(e) {
      console.log(e);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.deta {
  width: 350px;
  height: 52px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  font-size: 14px;
  color: #000000;
  font-weight: 600;
}
.item-box {
  width: 310px;
  height: auto;
  border-left: 1px solid #ccc;
  margin: 0 auto;
  position: relative;
  margin-top: 26px;
  .time {
    position: absolute;
    font-size: 14px;
    color: #636363;
    left: -18px;
    top: -18px;
  }
  .text {
    background: #fff;
    width: 290px;
    margin-left: 30px;
    font-size: 14px;
    color: #636363;
    line-height: 22px;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 4px;
    position: relative;
    top: -16px;
    text-align: justify;
  }
  .share-box {
    height: 30px;
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: -10px;
    .share {
      width: 60px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #636363;
      img {
        width: 20px;
        height: 20px;
        margin-right: 2px;
      }
    }
  }
}
.item-box-last {
  border-left: 0;
}
</style>