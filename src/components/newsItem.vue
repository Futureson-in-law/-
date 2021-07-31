<template>
  <div class="box">
    <div
      v-if="info.imageList.length > 0"
      class="have-img-box"
      @click="
        changeRouter(`/detail/${info.newsId}?dataSource=${info.dataSource}`)
      "
    >
      <div class="left">
        <div class="title">
          {{ info.title }}
        </div>
        <div class="tips">
          <img
            style="margin-right: 1px"
            src="../assets/img/icon-shijian@2x.png"
            alt=""
            srcset=""
          />
          {{ info.postDate }}
          <img
            style="margin: 0px 5px 0px 7px"
            src="../assets/img/icon-chakan@2x.png"
            alt=""
            srcset=""
          />
          {{ info.hits }}
        </div>
      </div>
      <div class="right">
        <img :src="info.imageList[0]" alt="" srcset="" />
      </div>
    </div>
    <div
      v-else
      class="no-img-box"
      @click="
        changeRouter(`/detail/${info.newsId}?dataSource=${info.dataSource}`)
      "
    >
      <div class="title">
        {{ info.title }}
      </div>
      <div class="tips">
        <img
          style="margin-right: 1px"
          src="../assets/img/icon-shijian@2x.png"
          alt=""
          srcset=""
        />
        {{ info.postDate }}
        <img
          style="margin: 0px 5px 0px 7px"
          src="../assets/img/icon-chakan@2x.png"
          alt=""
          srcset=""
        />
        {{ info.hits }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      changeRouter(router) {
        this.$router.push({
          path: router,
        });
      },
    };
  },
};
</script>

<style lang="less" scoped>
.have-img-box {
  width: 100%;
  height: 108px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 60%;
    height: initial;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
      color: #020202;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //多行在这里修改数字即可
      -webkit-box-orient: vertical;
      text-align: justify;
    }
    .tips {
      height: 24px;
      display: flex;
      align-items: center;
      color: #979797;
      font-size: 14px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
  .right {
    width: 35%;
    height: initial;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 90%;
      height: 90%;
    }
  }
}
.no-img-box {
  width: 100%;
  height: 74px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    font-size: 16px;
    color: #020202;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; //多行在这里修改数字即可
    -webkit-box-orient: vertical;
    text-align: justify;
  }
  .tips {
    height: 24px;
    display: flex;
    align-items: center;
    color: #979797;
    font-size: 14px;
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>