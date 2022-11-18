<script lang="ts" setup>
import Statistics from "./components/statistics.vue";
import Bar from "./components/bar.vue";
import Pie from "./components/pie.vue";
import Line from "./components/line.vue";
import Map from "./components/map.vue";
</script>

<template>
  <div class="dashboard">
    <Statistics />
    <el-row :gutter="20" class="mt-20">
      <el-col :md="12">
        <Bar />
      </el-col>
      <el-col :md="12">
        <Pie />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt-20">
      <el-col :md="12">
        <Line />
      </el-col>
      <el-col :md="12">
        <Map />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  .mt-20 {
    margin-top: 20px;
  }
}
</style>
