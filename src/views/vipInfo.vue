<template>
  <div v-if="pageData">
    <userBox :isbtn="false" />
    <div style="width: 100%; height: 30px"></div>
    <contact></contact>
    <div
      v-for="(item, index) of Available"
      :key="item.id"
      :class="`item${index}`"
      class="item"
    >
      <div class="title">
        <div class="left">
          <div class="name">{{ item.serviceName }}权益</div>
          <div class="time">将于{{ endDateGsh(item.endDate) }}到期</div>
        </div>
        <div class="right">
          <div @click="routeVip" class="btn">立即续费</div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 30px"></div>
  </div>
</template>

<script>
import userBox from "../components/userBox";
import { GetHqServiceByMemberID } from "../api/api";
import contact from "../components/contact";
export default {
  components: {
    userBox,
    contact,
  },
  created() {
    this.HqServiceByMemberID();
  },
  computed: {
    Available() {
      return this.pageData.filter(function (item) {
        return item.isAvailable == 0 && item.isVip;
      });
    },
  },
  data() {
    return {
      pageData: "",
    };
  },
  methods: {
    endDateGsh(time) {
      if (String(time).includes(" ")) {
        return String(time).split(" ")[0];
      }
      return time;
    },
    async HqServiceByMemberID() {
      let res = await GetHqServiceByMemberID({
        iMemberID: this.$store.getters.getUserInfo.memberID,
        isTY: true,
      });
      this.pageData = res.data;
    },
    routeVip() {
      this.$router.push({ name: "vip" });
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  width: 343px;
  height: 156px;
  margin: 0 auto;
  margin-top: 10px;
  .title {
    display: flex;
    width: 100%;
    height: 60px;
    .left {
      width: 240px;
      font-size: 16px;
      color: #fff;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding-left: 30px;
      box-sizing: border-box;
      .name {
        font-size: 15px;
        line-height: 34px;
        margin-top: 4px;
      }
      .time {
        font-size: 12px;
      }
    }
    .right {
      width: 143px;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        width: 90px;
        height: 36px;
        background: #ffffff;
        border-radius: 18px;
        font-size: 16px;
        color: #ff603f;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 4px;
      }
    }
  }
}
.item0 {
  background: url("../assets/img/card_quanpinlei@2x.png") no-repeat;
  background-size: 100%;
}
.item1 {
  background: url("../assets/img/card_jiancai@2x.png") no-repeat;
  background-size: 100%;
}
.item2 {
  background: url("../assets/img/card_bancai@2x.png") no-repeat;
  background-size: 100%;
}
.item3 {
  background: url("../assets/img/card_xingcai@2x.png") no-repeat;
  background-size: 100%;
}
.item4 {
  background: url("../assets/img/card_guancai@2x.png") no-repeat;
  background-size: 100%;
}
.item5 {
  background: url("../assets/img/card_quanpinlei@2x.png") no-repeat;
  background-size: 100%;
}
</style>