<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

import china from "../china";
import { mapData } from "../data";

const chartRef = ref<HTMLElement>();
onMounted(() => {
  echarts.registerMap("china", china as any);
  const chart = echarts.init(chartRef.value!);
  chart.setOption({
    title: {
      text: "各地区社会消费品零售额",
    },
    visualMap: {},
    geo: {
      map: "china",
    },
    series: [
      {
        name: "各地区社会消费品零售额",
        type: "map",
        map: "china",
        data: mapData,
      },
    ],
  });
});
</script>

<template>
  <div class="chart" ref="chartRef"></div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 340px;
  padding: 20px;
  background: #fff;
}
</style>
