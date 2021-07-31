<template>
  <div class="box">
    <van-nav-bar
      :left-arrow="true"
      title="今日快讯"
      left-text="返回"
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    />
    <van-list
      v-model="moreLoading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div v-if="!loading">
        <div
          class="time-box"
          v-for="(val, key, index) in listData"
          :key="index"
        >
          <div class="deta" :class="index == 0 ? 'color' : ''">{{ key }}</div>
          <div class="item-box" v-for="(item, oindex) of val" :key="oindex">
            <div class="time" :class="index == 0 && oindex == 0 ? 'color' : ''">
              {{ item.pubDate }}
            </div>
            <div class="text" :class="index == 0 ? 'color' : ''">
              {{ item.articleContent }}
            </div>
            <div class="share-box">
              <!-- <div class="share" @click="share">
            <img src="../assets/img/icon-fenxiang@2x.png" alt="" /> 转发
          </div> -->
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="shareOptions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { GetTodayNewsArticleList } from "../api/api";
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
      pageIndex: 1,
      pageSize: 20,
      listData: {},
      loading: true,
      moreLoading: false,
      finished: false,
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
  created() {
    this.TodayNewsArticleList();
  },
  methods: {
    async TodayNewsArticleList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      let res = await GetTodayNewsArticleList({
        memberId: 0,
        itemId: 99,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.listData = Object.assign({}, this.arrayChange(res.data));
      this.loading = false;
      this.$toast.clear();
    },
    async TodayNewsArticleListMore() {
      this.pageIndex = this.pageIndex + 1;
      let res = await GetTodayNewsArticleList({
        memberId: 0,
        itemId: 99,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.listData = Object.assign({}, this.arrayChange(res.data));
      this.moreLoading = false;
      if (res.data.length < 20) {
        this.finished = true;
      }
    },

    arrayChange(array) {
      let newListData = this.listData;
      array.forEach((element) => {
        let item = {
          pubDate: element.pubDate,
          articleContent: element.articleContent,
        };
        if (newListData[element.postDate] != undefined) {
          newListData[element.postDate].push(item);
        } else {
          newListData[element.postDate] = [item];
        }
      });
      return newListData;
    },
    onLoad() {
      this.TodayNewsArticleListMore();
    },
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
.color {
  color: #ff7100 !important;
}
</style>