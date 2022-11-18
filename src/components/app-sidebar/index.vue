<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { usePermissionStore } from "@/store/permission";
import { useSidebarStore } from "@/store/sidebar";

import SidebarItem from "./sidebar-item.vue";

const route = useRoute();
const activeMenu = computed((): string => {
  return (route.meta?.activeMenu as string) || route.path;
});

const permissionStore = usePermissionStore();
const sidebarStore = useSidebarStore();

const handleChangeCollapse = () => {
  sidebarStore.changeCollapse();
};
</script>

<template>
  <div class="app-sidebar">
    <el-menu
      :default-active="activeMenu"
      :collapse="sidebarStore.isCollapse"
      router
    >
      <sidebar-item
        v-for="route of permissionStore.routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <div class="collapse" @click="handleChangeCollapse">
      <component
        class="icon"
        :is="sidebarStore.isCollapse ? 'Expand' : 'Fold'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-sidebar {
  position: fixed;
  top: 60px;
  overflow: auto;
  bottom: 0;
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  :deep(.el-menu) {
    height: calc(100% - 40px);
    border-right: none;
    &:not(.el-menu--collapse) {
      width: 200px;
    }
    /*隐藏文字*/
    &.el-menu--collapse .el-sub-menu__title span {
      display: none;
    }
    /*隐藏 > */
    &.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow {
      display: none;
    }
    /* 浅色背景 */
    /* .el-sub-menu.is-active {
      .el-sub-menu__title {
        color: #409eff;
      }
    } */
    .el-menu-item.is-active {
      background: #e6f7ff;
      border-right: 2px solid #409eff !important;
    }
    /* 深色背景 */
    /* background-color: #4183e5;
    color: #fff;
    .el-menu-item,
    .el-sub-menu__title {
      color: #fff;
      &:hover {
        background: #3469b7;
      }
      &.is-active {
        background: #3469b7;
      }
    } */
  }
  .collapse {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    cursor: pointer;
    .icon {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
