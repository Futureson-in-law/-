<template>
  <div class="box">
    <van-nav-bar
      :fixed="true"
      :placeholder="true"
      :left-arrow="true"
      title="关于我们"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <div class="content">
      <p>
        中钢网（股票代码：831727）是由风险资本投资，集钢材行情资讯、现货资源搜索、终端采购招标，钢铁电子交易、无车智慧承运、广告信息销售、终端综合服务为一体的全国性大型钢铁互联网企业。
      </p>
      <p>
        中钢网现拥有合作钢铁企业20万家，注册用户27万余家，日活跃用户4万余家，网站日均访问量10万以上，每日发布现货50万条，现货资源1300万吨，日交易额峰值18亿元。中钢网共下设10家全资子公司、2家控股公司和7个办事处。共有注册用户27万家，日活跃用户4万余家。每日发布现货资源近50万条、800多万吨，日成交峰值达到44万余吨，交易额近17亿元。2020平台交易额达到2076亿元。
      </p>
      <p>
        中钢网牢记“科技让钢材交易更便捷”的企业使命、秉承“钢铁电商服务引领者”的企业愿景，采用“淘宝+京东”的线上、线下相结合的电子交易模式。依托平台十年积累的海量行情资讯、庞大交易规模和巨量采购订单，创新技术投入，运用大数据、云计算、物联网、SaaS平台等技术手段，促进钢铁信息化和工业化的两化融合，优化资源配置、旨在推进产业升级，创新协同模式、减少贸易环节，提升钢铁产品附加值和竞争力，打造钢铁产业链共赢生态圈。
      </p>
    </div>
    <div class="bottom">
      <img src="../../assets/img/icon_724@2x.png" alt="" srcset="" />
      <p>全国客服电话：400-700-8508</p>
      <p>董事长邮箱：ceo@zgw.com</p>
      <p>企业QQ：4007008500</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  line-height: 24px;
  border-top: 5px solid #f2f2f2;
  padding: 20px;
  text-align: justify;
  .content-title {
    text-indent: 2em;
  }
  p {
    text-indent: 2em;
    margin-bottom: 1em;
  }
}
.bottom {
  width: 100%;
  height: 206px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 8px solid #f2f2f2;
  padding-bottom: 12px;
  box-sizing: border-box;
  img {
    width: 100px;
    margin-bottom: 16px;
  }
  p {
    font-size: 14px;
    color: #000000;
    margin-bottom: 10px;
    font-size: 14px;
  }
}
</style>