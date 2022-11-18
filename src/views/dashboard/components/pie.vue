<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLElement>();
const chartData = [
  { name: "桐城市", value: 494 },
  { name: "潜山市", value: 701 },
  { name: "太湖县", value: 925 },
  { name: "宿松县", value: 541 },
  { name: "宜秀区", value: 610 },
  { name: "怀宁县", value: 764 },
  { name: "岳西县", value: 701 },
  { name: "望江县", value: 432 },
  { name: "大观区", value: 584 },
  { name: "迎江区", value: 516 },
];
onMounted(() => {
  const chart = echarts.init(chartRef.value!);
  chart.setOption({
    title: {
      text: "企业地区分布",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      right: "auto",
      top: "middle",
      left: "50%",
      itemGap: 50,
      icon: "circle",
      itemWidth: 10,
      orient: "vertical",
      formatter: (params: any) => {
        const target = chartData.find((item) => item.name == params);
        return `${params}      ${target?.value}`;
      },
    },
    series: [
      {
        name: "企业地区分布",
        type: "pie",
        radius: ["60%", "80%"],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        center: ["20%", "55%"],
        data: chartData,
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
