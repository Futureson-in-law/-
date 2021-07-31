<template>
  <div class="box">
    <van-swipe
      v-if="banner"
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        style="position: relative"
        v-for="(item, index) of banner"
        :key="index"
      >
        <img
          @click="routeLink(item.HttpUrl)"
          class="banner-img"
          :src="item.ImgUrl"
          alt=""
        />
      </van-swipe-item>
    </van-swipe>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item
          :lazy-render="false"
          ref="cityDropDown"
          :title="cityActive.CityName"
        >
          <div class="city-list">
            <van-index-bar :index-list="cityListLetters">
              <div v-for="item of cityList" :key="item.Py">
                <van-index-anchor :index="item.Py" />
                <van-cell
                  v-for="val of item.HQCityList"
                  :key="val.CityId"
                  :title="val.CityName"
                  :clickable="true"
                  :style="{
                    color: val.CityName == cityActive.CityName ? 'red' : '',
                    background:
                      val.CityName == cityActive.CityName ? '#efefef' : '',
                  }"
                  @click="changeCityActive(val)"
                />
              </div>
            </van-index-bar>
          </div>
        </van-dropdown-item>
        <van-dropdown-item
          @change="SelectTimeList"
          v-model="categoryActive"
          :options="categoryList"
          :disabled="categoryActive == -1"
        ></van-dropdown-item>
        <van-dropdown-item
          @change="WapNewPriceList"
          v-model="timeActive"
          :options="timeList"
          title-class="time-dropdown-item"
          :disabled="timeActive == -1"
        ></van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <van-pull-refresh v-model="pageLoading" @refresh="WapNewPriceList">
      <div v-if="listData.length > 0" class="content">
        <div
          class="item"
          v-for="(item, index) of listData"
          @click="showDetail"
          :key="index"
        >
          <div class="left">
            {{ item.partName }}<br />
            {{ item.gg }}
          </div>
          <div class="center">
            {{ item.cz }}<br />
            {{ item.productArea }}
          </div>
          <div
            @click="islink"
            :style="{ color: riseAndFall(item) }"
            class="right"
          >
            {{ item.price }}<br />
            {{ item.change }}
          </div>
        </div>
      </div>
      <van-loading
        style="margin-top: 100px"
        v-if="pageLoading"
        size="24px"
        vertical
        >加载中...</van-loading
      >
      <van-empty v-if="error" image="search" description="暂无行情" />
    </van-pull-refresh>

    <!-- <div :class="{ newsOpen: isNewsOpen }" class="news" @click="newsOpenChange">
      <div class="left">
        <img src="../assets/img/icon-jinri@2x.png" alt="" />
      </div>
      <div v-if="isNewsOpen" class="right">
        <van-swipe
          :show-indicators="false"
          :touchable="false"
          autoplay="3000"
          style="height: 55px; width: 300px"
          vertical
        >
          <van-swipe-item v-for="item of todayNewsList" :key="item.newsId">
            <div class="news-text">
              {{ item.title }}
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div> -->
    <van-divider v-if="listData.length > 10">到底了</van-divider>
    <van-popup v-model="overduePromptShow">
      <div class="overdue-prompt" @click="open">
        <div class="overdue-prompt-tiele">
          <span>您的会员已到期</span>
          <span>立即购买把握权威行情</span>
        </div>
      </div>
    </van-popup>
    <placeholder />
    <van-popup v-model="isFrame"
      ><img
        @click="closeIsFrame"
        class="isFrame"
        src="../assets/img/pic_tiyan@2x.png"
        alt=""
        srcset=""
    /></van-popup>
  </div>
</template>

<script>
import placeholder from "../components/placeholder";
import {
  GetHqCityList,
  GetSteelTypeListByCityId,
  GetSelectTimeList,
  GetWapNewPriceList,
  GetTodayNewsArticleList,
  GetBannerList,
} from "../api/api";
import { usercenter } from "../api/common";
import { chengCategoryList, chengTimeList } from "../util/util";
import { wxRecord } from "../api/common";
export default {
  name: "home",
  data() {
    return {
      cityListLetters: [],
      cityList: [],
      cityActive: { CityId: 1080200, CityName: "上海", Py: "S" },
      categoryActive: 0,
      categoryList: [],
      timeActive: 0,
      timeList: [],
      listData: [],
      isNewsOpen: false,
      pageLoading: false,
      error: false,
      downLoading: false,
      finished: false,
      pageIndex: 1,
      todayNewsList: [],
      banner: [],
      overduePromptShow: false,
      isFrame: false,
    };
  },
  components: {
    placeholder,
  },
  async activated() {
    await wxRecord(8002);
    if (this.$store.getters.getIndexRefresh) {
      this.WapNewPriceList();
      this.$store.commit("changIndexRefresh", false);
    }
    if (
      this.$store.getters.getUserInfo.loginFrame &&
      this.$store.getters.getUserInfo.loginFrame.isFrame
    ) {
      this.isFrame = this.$store.getters.getUserInfo.loginFrame.isFrame;
    }
  },
  created() {
    this.TodayNewsArticleList(); //获取今日快讯
    this.hqCityList(); //获取城市信息
    this.BannerList(); //获取bannerList
    if (this.$store.getters.getUserInfo.memberID) {
      this.firstLoginAlert(); //首次登陆检查是否是vip 不是弹出提示前往支付
    }
  },
  methods: {
    riseAndFall(item) {
      //计算颜色
      if (String(item.change).includes("↓")) {
        return "#0f990f";
      } else if (String(item.change).includes("↑")) {
        return "#f54545";
      }
    },

    newsOpenChange() {
      this.isNewsOpen = !this.isNewsOpen;
    },

    dataRefresh() {
      this.pageLoading = true;
      this.listData = [];
      this.error = false;
      this.finished = false;
    },

    async hqCityList() {
      const newLocal = this;
      newLocal.dataRefresh();
      let res = await GetHqCityList();
      this.cityListLetters = res.data.PyList;
      this.cityList = res.data.HQCityDataList;
      this.SteelTypeListByCityId();
    },

    changeCityActive(val) {
      this.dataRefresh();
      this.cityActive = val;
      this.$refs.cityDropDown.toggle();
      this.SteelTypeListByCityId();
    },

    async SteelTypeListByCityId() {
      //获取品类列表
      this.dataRefresh();
      let res = await GetSteelTypeListByCityId({
        cityId: this.cityActive.CityId,
      });
      this.categoryList = chengCategoryList(res.data);
      this.categoryActive = this.categoryList[0].value;
      this.SelectTimeList();
    },

    async SelectTimeList() {
      //获取更新时间列表
      this.dataRefresh();
      let res = await GetSelectTimeList({
        top: 7,
        cityId: this.cityActive.CityId,
        steelTypeId: this.categoryActive,
      });
      this.timeList = chengTimeList(res.data);
      this.timeActive = this.timeList[0].value;
      this.WapNewPriceList();
    },

    async WapNewPriceList() {
      //默认获取listData
      let data = {
        date: this.timeActive,
        cityId: this.cityActive.CityId,
        steelTypeId: this.categoryActive,
        memberID: this.$store.getters.getUserInfo.memberID,
        partName: "",
        texture: "",
        specs: "",
        steelPlace: "",
        pageIndex: 1,
        pageSize: 1000,
      };
      let res = await GetWapNewPriceList({
        ...data,
      });
      this.pageLoading = false;
      this.listData = res.data;
      if (res.data.length == 0) {
        this.error = true;
      }
    },
    // async loadMore() {
    //   //加载更多
    //   this.pageIndex = this.pageIndex + 1;
    //   let data = {
    //     date: this.timeActive,
    //     cityId: this.cityActive.CityId,
    //     steelTypeId: this.categoryActive,
    //     memberID: this.$store.getters.getUserInfo.memberID,
    //     partName: "",
    //     texture: "",
    //     specs: "",
    //     steelPlace: "",
    //     pageIndex: this.pageIndex,
    //     pageSize: 1000,
    //   };
    //   let res = await GetWapNewPriceList({
    //     ...data,
    //   });
    //   if (res.data.length == 0) {
    //     this.downLoading = false;
    //     this.finished = true;
    //     return;
    //   }
    //   this.listData = [...this.listData, ...res.data];
    //   this.downLoading = false;
    // },

    async TodayNewsArticleList() {
      let res = await GetTodayNewsArticleList({
        memberId: this.$store.getters.getUserInfo.memberID,
        itemId: 99,
        pageIndex: 1,
        pageSize: 5,
      });
      this.todayNewsList = res.data;
    },

    async BannerList() {
      let res = await GetBannerList();
      this.banner = res.data;
    },

    async firstLoginAlert() {
      let res = await usercenter();
      let show = this.isVip(res);
      if (this.$store.getters.getFirstLogin && show && show.isExpiredRemind) {
        this.overduePromptShow = true;
        return;
      }

      if (this.$store.getters.getFirstLogin && show == false)
        this.$dialog
          .alert({
            title: "您还不是全网通会员暂无法查看",
            message: "升级成为全网通会员，准确把握实时行情",
            theme: "round-button",
            confirmButtonText: "立即查看",
            confirmButtonColor: "#FFAA00",
            closeOnClickOverlay: true,
          })
          .then(() => {
            this.$store.commit("changeFirstLogin", false);
            this.$router.push({
              name: "vip",
            });
          })
          .catch(() => {});
    },

    isVip(data) {
      let hqServiceList = data.hqMemberInfo.hqServiceList;
      for (let index = 0; index < hqServiceList.length; index++) {
        const element = hqServiceList[index];
        if (element.isVip) {
          return element;
        }
      }
      return false;
    },
    open() {
      this.$router.push({
        name: "vip",
      });
    },
    routeLink(url) {
      if (url == "#") return;
      window.location.href = url;
    },
    async showDetail() {
      if (!this.$store.getters.getUserInfo.memberID) {
        this.$dialog
          .alert({
            title: "您还未登录暂无法查看",
            message: "登录行情站，准确把握实时行情",
            theme: "round-button",
            confirmButtonText: "前往登录",
            confirmButtonColor: "#FFAA00",
            closeOnClickOverlay: true,
          })
          .then(() => {
            this.$router.push({
              name: "login",
            });
          })
          .catch(() => {});
      }
    },
    async islink() {
      if (!this.$store.getters.getUserInfo.memberID) return;
      let res = await usercenter();
      let show = this.isVip(res);
      if (!show) {
        this.$router.push({
          name: "vip",
        });
      }
    },
    closeIsFrame() {
      this.isFrame = false;
    },
  },
};
</script>
<style lang="less" scoped>
.my-swipe {
  height: auto;
  height: 160px;
}
.banner-img {
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/deep/.van-popup--center {
  border-radius: 14px;
}
/deep/.van-index-bar__sidebar {
  margin-top: 10%;
}
/deep/.van-calendar__day,
/deep/.van-calendar__selected-day {
  height: 40px;
}
/deep/.van-popup--center {
  background: rgba(0, 0, 0, 0);
}
// /deep/.van-index-anchor {
//   background: #fff;
// }
.flash {
  height: 68px;
  width: 100%;
  position: fixed;
  bottom: 100px;
  background: red;
}

.content {
  .item {
    width: 95%;
    height: 60px;
    // border-top: 4px solid #eee;
    // border-bottom: 4px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    line-height: 18px;
    font-size: 14px;
    margin: 0 auto;
    background: #eee;
    border-radius: 8px;
    margin-top: 8px;
  }
}
.overdue-prompt {
  width: 292px;
  height: 306px;
  background: url("../assets/img/pic_daoqi@2x.png") no-repeat;
  background-size: 100%;
}
.overdue-prompt-tiele {
  width: 200px;
  height: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 20px;
  color: #fff;
  font-size: 14px;
  line-height: 26px;
  color: #333333;
}
.overdue-prompt-tiele span:nth-child(1) {
  font-size: 16px;
  font-weight: bold;
}
.refresh {
  width: 55px;
  height: 55px;
  background: #fff;
  border: 1px solid #eee;
  position: fixed;
  bottom: 170px;
  right: 10px;
  border-radius: 30px;
  transition: 0.4s all;
  box-shadow: 0 5px 15px #ccc;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
/deep/.van-icon-replay {
  transition: 5s all;
}
.van-icon-replay-rotate {
  transform: rotate(1000deg);
}
.news {
  width: 55px;
  height: 55px;
  background: #fff;
  border: 1px solid #eee;
  position: fixed;
  bottom: 100px;
  right: 10px;
  border-radius: 30px;
  transition: 0.4s all;
  box-shadow: 0 5px 15px #ccc;
  overflow: hidden;
  display: flex;
  .left {
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .right {
    width: 300px;
    height: 55px;
    background: url("../assets/img/close.png") no-repeat 270px center;
    background-size: 20px;
  }
  .news-text {
    height: 55px;
    box-sizing: border-box;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    border-left: 1px solid #efefef;
    line-height: 18px;
    color: #636363;
    font-size: 14px;
    width: 270px;
    text-align: justify;
  }
}
.newsOpen {
  width: 355px;
}
/deep/.time-dropdown-item {
  width: 90px;
}
.isFrame {
  width: 340px;
}
</style>