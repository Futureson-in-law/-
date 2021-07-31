<template>
  <div class="box">
    <van-nav-bar
      :fixed="true"
      :placeholder="true"
      :left-arrow="true"
      title="今日报价"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <router-link to="/vip">
      <img class="vip-banner" src="../assets/img/pic_huiyuan@2x.png" />
    </router-link>
    <div class="menu">
      <img src="../assets/img/icon-jinribaojia.png" alt="" srcset="" />
      <strong>今日报价</strong>
      <div class="calendar" @click="openCalendar">
        <img src="../assets/img/icon-rili@2x.png" alt="" srcset="" />
        <span>{{ data }}</span>
        <img style="width: 16px" src="../assets/img/icon-xiala@2x.png" />
      </div>
    </div>

    <div class="menu-box">
      <van-grid :border="false">
        <van-grid-item v-for="item of bjlist" :key="item.preferenceId">
          <div
            class="menu-item"
            @click="changeCzActive(item)"
            :class="{ 'item-active': item.preferenceId == czActive }"
          >
            {{ item.preferenceName }}
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="list">
          <div class="item" style="height: 75px">
            <div class="city">城市</div>
            <div class="cz-box">
              <div
                class="cz"
                :style="{ width: 100 / titleList.length + '%' }"
                v-for="item of titleList"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <div class="item" v-for="(item, index) of dataList" :key="index">
            <div class="city">{{ item.city }}</div>
            <div class="cz-box">
              <div
                class="cz"
                :style="{ width: 100 / item.jbTypeSubModelList.length + '%' }"
                v-for="(oitem, oindex) of item.jbTypeSubModelList"
                :key="oindex"
              >
                {{ oitem.price == 0 ? "--" : oitem.price }}
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <van-calendar
      title="选择日期"
      color="#FF7100"
      :show-confirm="false"
      :show-subtitle="false"
      :show-mark="false"
      :min-date="minDate"
      :max-date="maxDate"
      v-model="calendarShow"
      @confirm="changeCalendar"
    />
  </div>
</template>

<script>
import { changeTime } from "../util/util";
import { GetTodayQuotePriceList } from "../api/api";
import { _BJLIST } from "../util/_json";
export default {
  data() {
    return {
      calendarShow: false,
      bjlist: _BJLIST,
      czActive: 32,
      data: changeTime(new Date()),
      loading: false, //上拉加载loading
      finished: false, //是否没有更多了
      refreshing: false, //下拉刷新loading
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(),
      titleList: [],
      dataList: [],
      pageIndex: 1,
      pageSize: 20,
    };
  },
  created() {
    //初始化加载
    this.loading = true;
    this.TodayQuotePriceList();
  },
  methods: {
    openCalendar() {
      this.calendarShow = true;
    },
    changeCalendar(e) {
      //切换日期
      this.data = changeTime(e);
      this.calendarShow = false;
      this.pageIndex = 1;
      this.refreshing = true;
      this.TodayQuotePriceList();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    changeCzActive(item) {
      //切换材质
      this.czActive = item.preferenceId;
      this.pageIndex = 1;
      this.refreshing = true;
      this.TodayQuotePriceList();
    },
    onLoad() {
      //上拉加载
      this.pageIndex = this.pageIndex + 1;
      this.TodayQuotePriceList();
    },
    onRefresh() {
      //下拉刷新
      this.pageIndex = 1;
      this.TodayQuotePriceList();
    },
    //加载列表数据方法
    async TodayQuotePriceList() {
      let res = await GetTodayQuotePriceList({
        steelTypeId: this.czActive,
        dataTime: this.data,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });

      this.titleList = String(res.data.title).split(",");

      if (this.pageIndex == 1) {
        //加载更多作区别处理
        this.loading = false;
        this.refreshing = false;
        this.dataList = res.data.todayJbTypeModelList;
      } else {
        this.loading = false;
        this.dataList = [...this.dataList, ...res.data.todayJbTypeModelList];
      }

      if (res.rowcount < this.pageSize * this.pageIndex) {
        this.finished = true;
      } else {
        this.finished = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-grid-item__content {
  padding: 7px 0px;
}
/deep/.van-calendar__selected-day {
  height: 45px;
}
/deep/.van-calendar__day {
  height: 45px;
}
.vip-banner {
  width: 100%;
}
.menu {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  box-sizing: border-box;
  font-size: 14px;
  color: #636363;
  .calendar {
    display: flex;
    align-items: center;
  }
  strong {
    margin-right: 20px;
    font-weight: bold;
    color: #020202;
  }
  img {
    width: 28px;
    margin: 0 4px;
  }
}
.menu-box {
  padding: 6px 0;
  .menu-item {
    width: 72px;
    height: 30px;
    border-radius: 15px;
    background: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #636363;
  }
  .item-active {
    background: #ff7100;
    color: #ffffff;
  }
}
.list {
  width: 100%;
  .item {
    width: 100%;
    height: auto;
    display: flex;
    height: 44px;
    .city {
      width: 75px;
      font-size: 16px;
      color: #020202;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cz-box {
      width: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      .cz {
        color: #636363;
        font-size: 14px;
        line-height: 18px;
        padding: 0 4px;
        box-sizing: border-box;
        text-align: center;
      }
    }
  }
}
</style>