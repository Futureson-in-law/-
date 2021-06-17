<template>
  <div>
    <Header />
    <Swiper />
    <Menu />
    <News />
    <Purchase :purchase="purchase" />
    <PurchaseList :list-data="purchaseList" />
    <Footer />
    <placeholder />
  </div>
</template>
 
<script>
import { GetCaigouIndexList } from "../api/api";
import Header from "@/components/index/header";
import Swiper from "@/components/index/swiper";
import Menu from "@/components/index/menu";
import News from "@/components/index/news";
import Purchase from "@/components/index/purchase";
import PurchaseList from "@/components/index/purchase-list";
import placeholder from "@/components/placeholder";
import Footer from "@/components/index/footer";
export default {
  data() {
    return {
      purchaseList: [],
      purchase: {},
    };
  },
  components: {
    Header,
    Swiper,
    Menu,
    News,
    Purchase,
    PurchaseList,
    placeholder,
    Footer,
  },
  created() {
    this.CaigouIndexList();
  },
  methods: {
    async CaigouIndexList() {
      let res = await GetCaigouIndexList({
        pageindex: 1,
        pagesize: 16,
      });
      this.purchaseList = this._.chunk(res.data, 4);
      this.purchase = {
        countcompany: res.countcompany,
        caigoucount: res.caigoucount,
      };
    },
  },
};
</script>

<style lang="less" scoped>
</style>