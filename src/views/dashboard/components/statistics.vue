<script lang="ts" setup>
import originUrl from "@/assets/img/dashboard/num-origin.png";
import tableUrl from "@/assets/img/dashboard/num-table.png";
import fieldUrl from "@/assets/img/dashboard/num-field.png";
import StatisticsItem from "./statistics-item.vue";
</script>

<template>
  <el-row :gutter="20">
    <el-col :md="8">
      <StatisticsItem :img="originUrl" desc="数据源" :count="2268" />
    </el-col>
    <el-col :md="8">
      <StatisticsItem :img="tableUrl" desc="数据表" :count="16001" />
    </el-col>
    <el-col :md="8">
      <StatisticsItem :img="fieldUrl" desc="字段数" :count="32600" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped></style>
