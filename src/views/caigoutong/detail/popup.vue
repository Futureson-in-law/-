<template>
  <div class="box">
    <div class="title">订单报价</div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item name="1">
        <template #title>
          <div class="steel-title">
            <div class="left">钢厂</div>
            <div v-if="steelActive.name" class="content" style="color: #ff7100">
              {{ steelActive.name }}
            </div>
            <div v-else class="content">选择钢厂</div>
          </div>
        </template>
        <div class="steel-content ts">
          <van-field
            class="steel-content-soso"
            placeholder="输入“安”可搜索安钢等"
            v-model="sosoText"
            clearable
            label="名称搜索"
          />
          <div
            class="steel-item-box"
            v-for="(item, index) of steelList"
            :key="index"
          >
            <div class="steel-item-title">{{ item.name }}</div>
            <div class="steel-item-box">
              <div
                class="steel-item"
                :class="{ 'steel-item-active': steelActive.name == oitem.name }"
                @click="changeSteelActive(oitem)"
                v-for="(oitem, oindex) of item.list"
                :key="oindex"
              >
                {{ oitem.name }}
              </div>
            </div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item v-if="type == '1'" name="2">
        <template #title>
          <div class="steel-title">
            <div class="left">货物所在地</div>
            <div
              v-if="location.city.cityName"
              class="content"
              style="color: #ff7100"
            >
              {{ location.city.cityName }}
            </div>
            <div v-else class="content">选择地址</div>
          </div>
        </template>
        <div class="steel-content">
          <div class="steel-content-left">
            <div
              class="item"
              v-for="(item, index) of location.addressList"
              :key="index"
              :class="{
                'item-active': item.cityName == location.address.cityName,
              }"
              @click="changeLocation('address', item)"
            >
              {{ item.cityName }}
            </div>
          </div>
          <div class="steel-content-right">
            <div
              class="item"
              @click="changeLocation('city', item)"
              v-for="(item, index) of location.cityList"
              :key="index"
              :class="{
                'item-active': item.cityName == location.city.cityName,
              }"
            >
              {{ item.cityName }}
            </div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-field
      style="color: #ff7100"
      center
      clearable
      label="价格"
      v-model="price"
      maxlength="4"
      placeholder="请输入价格"
    >
      <template #button>元/吨</template>
    </van-field>
    <van-field
      style="color: #ff7100"
      v-if="type == '1'"
      center
      clearable
      label="运费"
      v-model="freight"
      placeholder="请输入运费"
    >
      <template #button>元/吨</template>
    </van-field>
    <van-button
      class="popupBtn"
      @click="popupBtn"
      type="primary"
      color="#ff7100"
      block
      >确定</van-button
    >
  </div>
</template>

<script>
import { GetProductAreaList, GetCityByFid } from "../../../api/api";
export default {
  props: {
    type: String,
  },
  data() {
    return {
      activeName: "0",
      steelList: [],
      steelListOld: [],
      steelActive: "",
      sosoText: "",
      price: "",
      freight: "",
      location: {
        address: "",
        city: "",
        addressList: "",
        cityList: "",
      },
    };
  },
  watch: {
    sosoText(val) {
      let res = this.steelSoso(val);
      this.steelList = res;
    },
  },
  created() {
    this.ProductAreaList();
    this.CityByFid();
  },
  methods: {
    async ProductAreaList() {
      let res = await GetProductAreaList();
      this.steelList = res.data;
      this.steelListOld = res.data;
    },
    async CityByFid() {
      let res = await GetCityByFid();
      this.location.addressList = res.data;
    },
    async changeLocation(name, item) {
      this.location[name] = item;
      if (name == "address") {
        let { data } = await GetCityByFid({
          fid: item.cityId,
        });
        this.location.city = "";
        this.location.cityList = data;
      }
      if (name == "city") {
        this.activeName = "0";
      }
    },
    changeSteelActive(item) {
      this.steelActive = item;
      this.activeName = "0";
      this.sosoText = "";
    },
    steelSoso(name) {
      if (name.length == 0) return this.steelListOld;
      let newArray = [];
      this.steelListOld.forEach((group) => {
        let newGroup = {
          name: group.name,
          list: [],
        };
        group.list.forEach((ele) => {
          if (ele.name.includes(name)) {
            newGroup.list.push(ele);
          }
        });
        newArray.push(newGroup);
      });
      return newArray;
    },
    popupBtn() {
      if (this.price < 2000) {
        this.$toast("价格输入有误");
        return;
      }
      let returnObj = {
        steel: this.steelActive,
        price: this.price,
        freight: this.freight,
        location: this.location,
      };
      this.$emit("popupCallback", returnObj);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 280px;
  height: 100%;
  /deep/.van-field__control {
    color: #ff7100;
  }
  .title {
    width: 280px;
    height: 44px;
    background: #f2f2f2;
    font-size: 16px;
    font-weight: 600;
    color: #020202;
    padding-left: 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .steel-title {
    display: flex;
    align-items: center;
    .left {
      width: 100px;
    }
    .content {
      width: 100px;
      font-size: 14px;
      color: #979797;
    }
  }
  .steel-content {
    height: 260px;
    width: 100%;
    display: flex;

    .steel-item-title {
      font-size: 16px;
      color: #636363;
      height: 36px;
      line-height: 36px;
      width: 100%;
      box-sizing: border-box;
      padding-left: 3px;
    }

    .steel-item-box {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .steel-content-soso {
      height: 44px;
      background: #f2f2f2;
      border-radius: 4px;
      /deep/.van-field__label {
        width: 60px;
      }
    }
    .steel-content-left {
      width: 50%;
      height: 260px;
      overflow-y: auto;
      box-sizing: border-box;
      border-right: 1px solid #f2f2f2;
    }
    .steel-content-right {
      width: 50%;
      height: 260px;
      overflow-y: auto;
    }
    .steel-item {
      width: 76px;
      height: 44px;
      background: #f2f2f2;
      margin: 0 3px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #636363;
      text-align: center;
    }
    .steel-item-active {
      background: #ff7100;
      color: #fff;
      border-radius: 3px;
    }
    .item {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      text-align: center;
      box-sizing: border-box;
      padding: 0 6px;
    }
    .item-active {
      color: #ff7100;
      font-weight: bold;
    }
  }
  .ts {
    display: block;
    overflow-y: auto;
  }
  .popupBtn {
    width: 90%;
    margin: 20px auto;
  }
}
</style> 