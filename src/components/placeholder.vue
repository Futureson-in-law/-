<template>
  <div
    style="width: 100%"
    :style="{ height: height + 'px', background: color }"
  ></div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 30,
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<style lang="less" scoped>
</style>