<template>
  <div class="box">
    <van-nav-bar
      :fixed="true"
      :placeholder="true"
      :left-arrow="true"
      title="新闻详情"
      left-text="返回"
      @click-left="onClickLeft"
    >
      <!-- <template #right>
        <van-icon name="share-o" size="18" />
      </template> -->
    </van-nav-bar>
    <div class="news-content">
      <div class="news-title">
        {{ data.title }}
      </div>
      <div class="news-info">
        <span>{{ data.itemName }}</span
        ><span style="color: #979797">{{ data.postDate }}</span
        ><span>来源：{{ data.copyFrom }}</span>
      </div>
      <div class="news-html" v-html="data.articleContent"></div>
      <div class="hits">{{ data.hits }}阅读</div>
      <div class="statement">
        免责声明：本文所载信息仅供参考，不作为直接决策建议。如无意中侵犯您的合法权益，请及时联系与处理。
      </div>
      <placeholder />
    </div>
  </div>
</template>

<script>
import { GetArticleDetail } from "../api/api";
import placeholder from "../components/placeholder";
export default {
  data() {
    return {
      newsId: "",
      DataSource: "",
      data: "",
    };
  },
  components: {
    placeholder,
  },
  created() {
    if (this.$route.params.id) {
      this.newsId = this.$route.params.id;
    }
    if (this.$route.query.DataSource) {
      this.DataSource = this.$route.query.DataSource;
    }
    this.ArticleDetail();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async ArticleDetail() {
      let res = await GetArticleDetail({
        newsId: this.newsId,
        DataSource: this.DataSource,
      });
      this.data = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.news-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #020202;
  padding: 18px 16px;
  line-height: 26px;
  text-align: justify;
}
.news-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 0px 16px;
  span {
    font-size: 12px;
    margin-right: 10px;
    color: #333;
  }
}
.news-html {
  font-size: 14px;
  padding: 0px 16px;
  text-align: justify;
  /deep/p {
    line-height: 24px;
    margin-bottom: 6px;
  }
}
.hits {
  padding: 10px 16px;
  font-size: 14px;
  color: #7e7d7d;
}
.statement {
  color: #7e7d7d;
  font-size: 12px;
  padding: 8px 16px;
}
</style>