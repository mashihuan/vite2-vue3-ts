<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLElement>();
onMounted(() => {
  const chart = echarts.init(chartRef.value!);
  chart.setOption({
    title: {
      text: "线上消费品零售额",
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
        name: "线上消费品零售额",
        type: "line",
        showSymbol: false,
        itemStyle: {
          color: "#20BB74",
        },
        data: [270, 370, 240, 210, 330, 250, 280, 240, 300, 240, 180, 300],
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(32, 187, 116, 0.8)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(32, 187, 116, 0.1)", // 100% 处的颜色
              },
            ],
          },
        },
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
