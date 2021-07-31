<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :placeholder="true"
      :left-arrow="true"
      title="钢铁资讯"
      left-text="返回"
      @click-left="onClickLeft"
    />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="NewsIndexListMore"
    >
      <van-tabs
        color="#FF7100"
        title-active-color="#FF7100"
        v-model="active"
        sticky
        swipeable
        offset-top="46px"
        :lazy-render="false"
        @change="tabsChange"
        :before-change="beforeChange"
      >
        <van-tab v-for="item of tabs" :title="item.name" :key="item.itemId">
          <div class="content">
            <div v-if="item.childList" class="content-header">
              <van-grid :border="false">
                <van-grid-item
                  v-for="oitem of item.childList"
                  :key="oitem.itemId"
                >
                  <div
                    class="menu-item"
                    :name="active"
                    :class="{
                      'item-active': oitem.itemId == tabsActive,
                    }"
                    @click="changeMenuItem(oitem)"
                  >
                    {{ oitem.name }}
                  </div>
                </van-grid-item>
              </van-grid>
            </div>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <div class="content-list">
                <newsItem
                  v-for="(oitem, index) of listData"
                  :info="oitem"
                  :key="index"
                  :have-img="false"
                />
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </van-list>
  </div>
</template>

<script>
import newsItem from "../components/newsItem";
import { GetNewsIndexList } from "../api/api";
export default {
  data() {
    return {
      active: 0,
      tabs: [
        {
          name: "钢市日报",
          itemId: 202,
        },
        {
          name: "钢铁新闻",
          itemId: 46,
        },
        {
          name: "钢厂动态",
          itemId: 52,
        },
        {
          name: "产经新闻",
          itemId: 111,
          childList: [
            {
              name: "基建",
              itemId: 111,
            },
            {
              name: "地产",
              itemId: 112,
            },
            {
              name: "石化",
              itemId: 113,
            },
            {
              name: "汽车",
              itemId: 114,
            },
            {
              name: "船舶",
              itemId: 115,
            },
            {
              name: "轻工",
              itemId: 116,
            },
            {
              name: "机电",
              itemId: 117,
            },
          ],
        },
      ],
      tabsActive: 111, //固定基建
      listData: [],
      pageIndex: 1,
      pageSize: 20,
      loading: false,
      finished: false,
      refreshing: false,
      cancel: "",
    };
  },
  components: {
    newsItem,
  },
  created() {
    this.NewsIndexList();
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async NewsIndexList() {
      this.pageIndex = 1;
      this.finished = false;
      let res = await GetNewsIndexList({
        memberId: 0,
        itemId: this.tabs[this.active].itemId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.listData = res.data;
      this.refreshing = false;
      this.$toast.clear();
    },
    async NewsIndexListMore() {
      this.pageIndex = this.pageIndex + 1;
      let res = await GetNewsIndexList({
        memberId: 0,
        itemId: this.tabs[this.active].itemId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.listData = [...this.listData, ...res.data];
      this.loading = false;
      if (res.data.length < 20) {
        this.finished = true;
      }
    },
    tabsChange() {
      this.refreshing = true;
      this.NewsIndexList();
    },
    beforeChange() {
      if (this.refreshing) {
        return false;
      } else {
        return true;
      }
    },
    changeMenuItem(item) {
      this.tabsActive = item.itemId;
      this.tabs[3].itemId = item.itemId;
      this.tabsChange();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
    },
    onRefresh() {
      this.NewsIndexList();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-tabs--line .van-tabs__wrap {
  border-bottom: 8px solid #f2f2f2;
}
/deep/.van-grid-item__content {
  padding: 5px 0px;
}
.content {
  .content-header {
    padding: 5px 0;
    border-bottom: 8px solid #f2f2f2;
    .menu-item {
      width: 72px;
      height: 28px;
      border-radius: 15px;
      background: #f2f2f2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #636363;
    }
    .item-active {
      color: #fff;
      background: #ff7100;
    }
  }
}
</style>