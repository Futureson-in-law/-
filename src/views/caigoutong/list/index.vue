<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :placeholder="true"
      :left-arrow="true"
      title="采购通"
      left-text="返回"
      right-text="发布采购信息"
      @click-right="QGBalert"
      @click-left="onClickLeft"
    />
    <van-sticky>
      <van-dropdown-menu active-color="#FF7100">
        <van-dropdown-item
          ref="location"
          :title="location.city.cityName ? location.city.cityName : '收货地'"
        >
          <div class="address">
            <div class="provinces">
              <div
                class="address-item"
                :class="{
                  'address-active': item.cityName == location.address.cityName,
                }"
                @click="changeAddress('address', item)"
                v-for="item of location.addressList"
                :key="item.cityId"
              >
                {{ item.cityName }}
              </div>
            </div>
            <div v-if="location.cityList.length > 0" class="city">
              <div
                class="address-item"
                :class="{
                  'address-active': item.cityName == location.city.cityName,
                }"
                @click="changeAddress('city', item)"
                v-for="item of location.cityList"
                :key="item.cityId"
              >
                {{ item.cityName }}
              </div>
            </div>
            <div v-else class="city city-empty">请先选择省份</div>
          </div>
        </van-dropdown-item>
        <van-dropdown-item
          ref="stateActive"
          :title="stateActive.name ? stateActive.name : '信息状态'"
        >
          <div class="state">
            <van-grid class="state-box" :border="false" :gutter="20">
              <van-grid-item v-for="item of stateList" :key="item.typeId">
                <div
                  @click="changeActive('stateActive', item)"
                  :class="{
                    'state-box-item-active': item.name == stateActive.name,
                  }"
                  class="state-box-item"
                >
                  {{ item.name }}
                </div>
              </van-grid-item>
            </van-grid>
          </div>
        </van-dropdown-item>
        <van-dropdown-item ref="typeActive" title="采购类型">
          <div class="type">
            <van-grid class="state-box" :border="false" :gutter="20">
              <van-grid-item v-for="item of typeList" :key="item.typeId">
                <div
                  @click="changeActive('typeActive', item)"
                  class="state-box-item"
                  :class="{
                    'state-box-item-active': item.name == typeActive.name,
                  }"
                >
                  {{ item.name }}
                </div>
              </van-grid-item>
            </van-grid>
          </div>
        </van-dropdown-item>
        <van-dropdown-item ref="screen" title="筛选">
          <div class="screen">
            <div class="title">
              <div class="screen-item">种类</div>
              <div class="screen-item">品名</div>
              <div class="screen-item">材质</div>
            </div>
            <div class="content">
              <div class="screen-list">
                <div
                  class="screen-item"
                  :class="{
                    'screen-item-active': screen.zlActive.name == item.name,
                  }"
                  v-for="(item, index) of screen.zlList"
                  @click="changeScreen('zlActive', item)"
                  :key="index"
                >
                  {{ item.name }}
                </div>
              </div>

              <div
                v-if="screen.pmList.length > 0"
                class="screen-list"
                style="background: #f2f2f2"
              >
                <div
                  class="screen-item"
                  v-for="(item, index) of screen.pmList"
                  :class="{
                    'screen-item-active': screen.pmActive.name == item.name,
                  }"
                  @click="changeScreen('pmActive', item)"
                  :key="index"
                >
                  {{ item.name }}
                </div>
              </div>

              <div
                class="screen-list screen-list-empty"
                style="background: #f2f2f2"
                v-else
              >
                请先选择种类
              </div>

              <div v-if="screen.ggList.length > 0" class="screen-list">
                <div
                  class="screen-item"
                  :class="{
                    'screen-item-active': screen.ggActive.name == item.name,
                  }"
                  @click="changeScreen('ggActive', item)"
                  v-for="(item, index) of screen.ggList"
                  :key="index"
                >
                  {{ item.name }}
                </div>
              </div>

              <div v-else class="screen-list screen-list-empty">
                请先选择品名
              </div>
            </div>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="listLoad"
      :immediate-check="false"
    >
      <listItem v-for="(item, index) of list" :item-data="item" :key="index" />
    </van-list>
  </div>
</template>

<script>
import listItem from "./list-item";
import { _CGT_STATE_LIST, _CGT_TYPE_LIST } from "../../../util/_json";
import {
  GetCaiGouList,
  GetCityByFid,
  GetCaiGouDefaultData,
} from "../../../api/api";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      stateList: _CGT_STATE_LIST,
      typeList: _CGT_TYPE_LIST,
      location: {
        address: "",
        city: "",
        addressList: "",
        cityList: "",
      },
      stateActive: {},
      typeActive: {},
      screen: {
        zlList: [],
        zlActive: "",
        pmList: [],
        pmActive: "",
        ggList: [],
        ggActive: "",
      },
    };
  },
  async created() {

    let { data } = await GetCityByFid();
    this.location.addressList = data;
    let zlList = await GetCaiGouDefaultData({
      infoType: 0,
    });
    this.screen.zlList = zlList.data;
    this.changeListData();
  },
  components: {
    listItem,
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f2f2f2");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  activated() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f2f2f2");
  },
  deactivated() {
    document.querySelector("body").removeAttribute("style");
  },
  methods: {
    listLoad() {},
    async QGBalert() {
      try {
        let res = await this.$dialog.confirm({
          title: "抢钢宝APP，一键即可找货",
          confirmButtonText: "去APP发布",
          confirmButtonColor: "#FF7100",
        });
      } catch (error) {}
    },
    async changeAddress(name, item) {
      this.location[name] = item;
      if (name == "address") {
        let { data } = await GetCityByFid({
          fid: item.cityId,
        });
        this.location.cityList = data;
      }
      if (name == "city") {
        this.$refs.location.toggle();
        this.changeListData();
      }
    },
    changeActive(name, item) {
      this[name] = item;
      this.$refs[name].toggle();
      this.changeListData();
    },
    async changeScreen(name, item) {
      this.screen[name] = item;
      if (name == "zlActive") {
        let pmdata = await GetCaiGouDefaultData({
          infoType: 1,
          fId: item.typeId,
        });
        this.screen.pmList = pmdata.data;
        this.screen.pmActive = "";
        this.screen.ggList = [];
      }
      if (name == "pmActive") {
        let ggdata = await GetCaiGouDefaultData({
          infoType: 2,
          typeName: item.name,
        });
        this.screen.ggList = ggdata.data;
        this.screen.ggActive = "";
      }
      if (name == "ggActive") {
        this.$refs.screen.toggle();
        this.changeListData();
      }
    },
    async changeListData() {
      let res = await GetCaiGouList({
        pageindex: 1,
        pagesize: 15,
        deliveryarea: this.location.city.cityName || "",
        status: this.stateActive.typeId || 0,
        cgType: this.typeActive.typeId || 0,
        zl: this.screen.zlActive.name || "",
        pm: this.screen.pmActive.name || "",
        cz: this.screen.ggActive.name || "",
      });
      this.list = res.data;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  height: calc(100vh - 96px);
  overflow-y: auto;
  background: #f2f2f2;
}
/deep/.van-nav-bar__right .van-nav-bar__text {
  color: #ff7100;
}
/deep/.van-grid-item__content {
  padding: 0;
}
.address {
  height: 300px;
  width: 100%;
  display: flex;
  .address-active {
    color: #ff7100;
    font-weight: bold;
  }
  .provinces {
    width: 50%;
    height: 300px;
    overflow-y: auto;
    padding: 10px 0;
    box-sizing: border-box;
    border-right: 1px solid #efefef;
  }

  .address-item {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .city {
    width: 50%;
    height: 300px;
    overflow-y: auto;
    padding: 10px 0;
    box-sizing: border-box;
  }
  .city-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bbb;
    font-size: 14px;
  }
}
.state {
  height: 200px;
  width: 100%;
  display: flex;
  padding-top: 30px;
  box-sizing: border-box;
  .state-box {
    width: 100%;
    height: 45px;
    .state-box-item {
      height: 45px;
      width: 100%;
      font-size: 14px;
      background: #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #636363;
    }
    .state-box-item-active {
      color: #fff;
      background: #ff7100;
    }
  }
}
.type {
  .state;
}
.screen {
  width: 100%;
  height: 350px;
  .title {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
  }
  .screen-item {
    width: 33.33%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #636363;
  }
  .content {
    width: 100%;
    height: 300px;
    display: flex;
    .screen-list {
      width: 33.33%;
      height: 300px;
      overflow-y: auto;
      .screen-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #636363;
        height: 50px;
        transition: 0.3s all;
      }
      .screen-item-active {
        color: #ff7100;
        font-weight: bold;
        font-size: 16px;
      }
    }
    .screen-list-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #bbb;
    }
  }
}
</style>




pageindex: 1
pagesize: 15
deliveryarea: 
status: 0
cgType: 0
zl: 
pm: 
cz:
gc: 
GgtType: 0
cityId: 0