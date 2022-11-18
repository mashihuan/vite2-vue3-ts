<script lang="ts" setup>
import CountTo from "@/components/count-to/index.vue";

defineProps({
  img: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "描述",
  },
  count: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="statistics-item">
    <div class="item-left">
      <img :src="img" alt="" />
    </div>
    <div class="item-right">
      <div class="item-right_desc">{{ desc }}</div>
      <div class="item-right_count">
        <CountTo :endVal="count" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.statistics-item {
  display: flex;
  align-items: center;
  padding: 0 32px;
  height: 110px;
  background-color: #fff;
  .item-left {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    margin-right: 64px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .item-right {
    width: 70%;
    .item-right_desc,
    .item-right_count {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .item-right_count {
      margin-top: 10px;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>
