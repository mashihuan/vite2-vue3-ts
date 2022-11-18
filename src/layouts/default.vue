<script lang="ts" setup>
import { useSidebarStore } from "@/store/sidebar";

import AppHeader from "@/components/app-header/index.vue";
import AppSidebar from "@/components/app-sidebar/index.vue";

const sidebarStore = useSidebarStore();
</script>

<template>
  <el-container>
    <el-header>
      <app-header />
    </el-header>
    <el-container>
      <el-aside :width="sidebarStore.isCollapse ? '62px' : '200px'">
        <app-sidebar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped></style>
