<script lang="ts" setup>
import { ref } from "vue";
import path from "path-browserify";
import type { IRouteRecordRaw } from "@/router/types";

const props = defineProps<{
  item: IRouteRecordRaw;
  basePath: string;
}>();
const onlyOneChild = ref<IRouteRecordRaw>();
const hasOneShowingChild = (
  children: IRouteRecordRaw[] = [],
  parent: IRouteRecordRaw
): boolean => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};

const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>

<template>
  <div class="sidebar-item" v-if="!item.hidden">
    <el-menu-item
      :index="resolvePath(onlyOneChild!.path)"
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild!.children || onlyOneChild!.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <component class="sidebar-item-icon" :is="onlyOneChild!.meta?.icon" />
      <template #title>{{ onlyOneChild!.meta?.title }}</template>
    </el-menu-item>

    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <component class="sidebar-item-icon" :is="item!.meta?.icon" />
        <span>{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-item-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
</style>
