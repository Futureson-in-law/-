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
    <div class="news-content" v-if="!loading">
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
import $ from "jquery";
import placeholder from "../components/placeholder";

export default {
  data() {
    return {
      newsId: "",
      DataSource: "",
      data: "",
      loading: true,
    };
  },
  components: {
    placeholder,
  },
  created() {
    if (this.$route.params.id) {
      this.newsId = this.$route.params.id;
    }
    if (this.$route.query.dataSource) {
      this.DataSource = this.$route.query.dataSource;
    }
    this.ArticleDetail();
  },
  mounted() {
    this.contnetChange();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async ArticleDetail() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      let res = await GetArticleDetail({
        newsId: this.newsId,
        DataSource: this.DataSource,
      });
      this.data = res.data;
      this.loading = false;
      this.$toast.clear();
    },
    contnetChange() {
      setTimeout(() => {
        $.each($("table"), function (index, val) {
          $(val).wrap("<div class='table-box'></div>");
        });
        $.each($("a"), function (index, val) {
          if (val.text == "钢厂频道") {
            $(val).parents("p").hide();
          } else if (val.text == "www.zgw.com") {
            $(val).hide();
          }
        });
      }, 100);
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
  /deep/img {
    max-width: 100%;
    height: auto !important;
  }
  /deep/.table-box {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
  /deep/table {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    td {
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 4px 6px;
      color: #333 !important;
    }
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
.table-box {
  width: 100%;
  overflow-x: scroll;
}
</style>