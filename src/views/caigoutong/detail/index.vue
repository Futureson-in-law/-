<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :placeholder="true"
      :left-arrow="true"
      title="订单报价"
      left-text="返回"
      @click-left="onClickLeft"
    />

    <div class="noticeBar">
      <img
        src="../../../assets/img/icon-daojishi@2x.png"
        alt=""
        srcset=""
      />报价截止：<span>{{ pageData.endDate }}</span> 收到报价({{
        pageData.bjCount
      }})
    </div>

    <div class="info">
      <div class="title">采购要求：</div>
      <div class="list">
        <div class="name">收货地区：</div>
        <div class="value">{{ pageData.deliveryArea }}</div>
      </div>
      <div class="list">
        <div class="name">交货日期：</div>
        <div class="value">
          下单后{{ pageData.deliveryTime }}天内交货至采购商收货地
        </div>
      </div>
      <div class="list">
        <div class="name">交易方式：</div>
        <div class="value">{{ pageData.dealTypeName }}</div>
      </div>
      <div class="list">
        <div class="name">经营模式：</div>
        <div class="value">{{ pageData.manageMode }}</div>
      </div>
      <div class="list">
        <div class="name">发票信息：</div>
        <div class="value">{{ pageData.receiptTypeName }}</div>
      </div>
      <div class="list">
        <div class="name">报价类型：</div>
        <div class="value">{{ pageData.taxState }}</div>
      </div>
    </div>

    <div class="offerType">
      <span>报价方式：</span
      ><van-radio-group
        checked-color="#FF7100"
        v-model="radio"
        direction="horizontal"
      >
        <van-radio name="1">出厂价</van-radio>
        <van-radio name="2">一票到</van-radio>
      </van-radio-group>
    </div>

    <div class="list-box">
      <listItem
        :item-data="item"
        :index="index"
        @open="openCallback"
        v-for="(item, index) of pageData.caiGouDetailList"
        :key="index"
      ></listItem>
    </div>

    <div class="note">
      <div class="title">
        <img src="../../../assets/img/icon-beizhu@2x.png" alt="" srcset="" />
        备注
      </div>
      <div class="textarea-box">
        <van-field
          v-model="noteText"
          rows="3"
          type="textarea"
          maxlength="60"
          placeholder="您对采购方有什么想说的?"
          show-word-limit
        />
      </div>
    </div>

    <div class="options">
      <div class="left">
        <div class="num">共<span>3</span>条商品，总重<span>32</span>吨</div>
        <div class="price">商品总价：<span>¥50040.00</span></div>
      </div>
      <div class="right">
        <van-button
          @click="QuotedPrice"
          color="#FF7100"
          type="primary"
          size="normal"
          >提交报价</van-button
        >
      </div>
    </div>
    <div class=""></div>
    <placeholder :height="70" style="margin-top: 10px" />
    <van-popup v-model="show" position="right" style="height: 100%">
      <popup
        :safe-area-inset-bottom="true"
        :close-on-popstate="true"
        @popupCallback="popup"
        :type="radio"
      />
    </van-popup>
  </div>
</template>

<script>
import listItem from "./list-item";
import placeholder from "../../../components/placeholder";
import popup from "./popup";
import {
  GetSelectiveOrderDetailByCgId,
  AddQuotedPrice,
} from "../../../api/api";
export default {
  data() {
    return {
      radio: "1",
      openIndex: 0,
      noteText: "",
      show: false,
      pageData: "",
    };
  },
  components: {
    listItem,
    placeholder,
    popup,
  },
  async created() {
    if (!this.$route.params.id) return;
    let res = await GetSelectiveOrderDetailByCgId({
      cgId: this.$route.params.id,
      memberId: this.$store.getters.getUserInfo.memberID,
    });
    this.pageData = res.data;
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
    onClickLeft() {
      this.$router.go(-1);
    },
    openCallback(index) {
      this.openIndex = index;
      this.show = true;
    },
    popup(data) {
      this.show = false;
      console.log(data);
    },
    async QuotedPrice() {
      console.log(this.pageData);
      let zyDate = this.pageData.caiGouDetailList[this.openIndex];
      return;
      let result = {
        cgId: zyDate.cgId,
        memberId: this.$store.getters.getUserInfo.memberID,
        epId: 0,
        priceType: this.radio,
        quotedPriceList: [
          {
            cgDetailId: zyDate.cgDetailId,
            productArea: "string",
            deliveryArea: "string",
            price: 0,
            freight: 0,
            remark: "`string`",
            files: "string",
          },
        ],
      };

      let res = await AddQuotedPrice({});
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.noticeBar {
  width: 100%;
  height: 44px;
  background: #fffbdd;
  color: #ff7100;
  font-size: 14px;
  display: flex;
  align-items: center;
  img {
    width: 28px;
    height: 28px;
    margin: 0 6px;
  }
  span {
    margin-right: 30px;
  }
}
.info {
  background: #fff;
  padding: 10px 0px;
  .title {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 600;
    color: #020202;
  }
  .list {
    display: flex;
    align-items: center;
    height: 28px;
    font-size: 14px;
    padding: 0 16px;
    .name {
      color: #636363;
    }
    .value {
      color: #020202;
    }
  }
}
.offerType {
  display: flex;
  align-items: center;
  width: 360px;
  height: 44px;
  background: #fff;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 10px;
  padding-left: 16px;
  box-sizing: border-box;
  span {
    font-size: 14px;
    color: #020202;
    font-weight: 600;
  }
}
.note {
  width: 360px;
  height: 170px;
  background: #fff;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 4px;
  .title {
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    display: flex;
    align-items: center;
    padding-left: 10px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 6px;
      display: block;
    }
  }
  .textarea-box {
    width: 340px;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
}
.options {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  background: #fff;
  .left {
    padding-left: 16px;
    width: 240px;
    .num {
      font-size: 12px;
      color: #636363;
    }
    .price {
      font-size: 16px;
      color: #4c4c4c;
      margin-top: 5px;
    }
    span {
      color: #ff0000;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
}
</style>