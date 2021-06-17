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
      中钢网（股票代码：831727）是由风险资本投资，集钢材行情资讯、现货资源搜索、终端采购招标，钢铁电子交易、无车智慧承运、广告信息销售、终端综合服务为一体的全国性大型钢铁互联网企业。<br />
      中钢网牢记“科技让钢材交易更便捷”的企业使命、秉承“钢铁电商服务引领者”的企业愿景，采用“淘宝+京东”的线上、线下相结合的电子交易模式。依托平台十年积累的海量行情资讯、庞大交易规模和巨量采购订单，创新技术投入，运用大数据、云计算、物联网、SaaS平台等技术手段，促进钢铁信息化和工业化的两化融合，优化资源配置、旨在推进产业升级，创新协同模式、减少贸易环节，提升钢铁产品附加值和竞争力，打造钢铁产业链共赢生态圈。<br />
      中钢网共下设10家全资子公司、2家控股公司和7个办事处。共有注册用户27万家，日活跃用户4万余家。每日发布现货资源近50万条、800多万吨，日成交峰值达到44万余吨，交易额近17亿元。2020平台交易额达到2076亿元。<br />
      通过裂变式发展，中钢网连续四年入选“中国互联网百强企业”，荣获工信部“2019年制造业双创平台示范试点”、“2017年制造业与互联网融合试点企业”，商务部“2019年首批线上线下融合发展数字商务企业”、“2017-2018年国家电子商务示范企业”，中国电子商务协会“最具投资价值行业门户”，新三板“最具成长价值新三板企业”，“互联网+创新示范单位”、“诚信兴商示范企业”等荣誉称号。公司获67个软件著作权、8个商标，并通过了ISO9001质量管理体系认证、ISO27001信息安全体系认证、知识产权体系认证，是一个快速裂变发展的钢铁互联网平台企业。<br />
      中钢网在创立之初，便以“搭建供需桥梁，简化贸易流程，提升工作效率，降低经营成本”为目标，源源不断为钢铁行业客户创造更多价值。
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
    width: 80px;
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