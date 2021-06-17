<template>
  <div class="box">
    <div v-if="haveImg" class="have-img-box" @click="changeRouter('/detail/1')">
      <div class="left">
        <div class="title">
          6月5日天津源泰德润方矩管源泰德润方矩管源泰德润方矩管
        </div>
        <div class="tips">
          <img
            style="margin-right: 1px"
            src="../assets/img/icon-shijian@2x.png"
            alt=""
            srcset=""
          />
          10分钟前
          <img
            style="margin: 0px 5px 0px 7px"
            src="../assets/img/icon-chakan@2x.png"
            alt=""
            srcset=""
          />
          864
        </div>
      </div>
      <div class="right">
        <img src="../assets/img/pic1@2x.png" alt="" srcset="" />
      </div>
    </div>
    <div v-else class="no-img-box" @click="changeRouter('/detail/1')">
      <div class="title">
        6月5日天津源泰德润方矩管源泰德润方矩管源泰德润方矩管
      </div>
      <div class="tips">
        <img
          style="margin-right: 1px"
          src="../assets/img/icon-shijian@2x.png"
          alt=""
          srcset=""
        />
        10分钟前
        <img
          style="margin: 0px 5px 0px 7px"
          src="../assets/img/icon-chakan@2x.png"
          alt=""
          srcset=""
        />
        864
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    haveImg: {
      type: Boolean,
      default: false,
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

    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>