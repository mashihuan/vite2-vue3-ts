<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLElement>();
onMounted(() => {
  const chart = echarts.init(chartRef.value!);
  chart.setOption({
    title: {
      text: "企业注册量",
    },
    grid: {
      top: 60,
      bottom: 0,
      left: 20,
      right: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    xAxis: {
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        name: "企业注册量",
        type: "bar",
        barWidth: 12,
        itemStyle: {
          color: "#5C7DEE",
          borderRadius: [5, 5, 0, 0],
        },
        data: [270, 770, 240, 1180, 300, 800, 200, 1200, 300, 800, 180, 1300],
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
