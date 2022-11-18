<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="app">
      <suspense>
        <router-view v-slot="{ Component }">
          <transition name="rotate-3d">
            <component :is="Component"></component>
          </transition>
        </router-view>
        <template #fallback>loading...</template>
      </suspense>
    </div>
  </el-config-provider>
</template>

<style scoped>
.app {
  min-height: 100vh;
  perspective: 800px;
}
.rotate-3d-enter-active,
.rotate-3d-leave-active {
  position: absolute;
  width: 100%;
  transform-style: preserve-3d;
  transition: all 0.85s ease;
}
.rotate-3d-enter-active,
.rotate-3d-enter-from,
.rotate-3d-enter-to {
  transform-origin: right center;
}
.rotate-3d-leave-active,
.rotate-3d-leave-from,
.rotate-3d-leave-to {
  transform-origin: left center;
}
.rotate-3d-enter-from {
  transform: rotateY(-180deg);
}
.rotate-3d-enter-to {
  transform: rotateY(0);
}
.rotate-3d-leave-from {
  transform: rotateY(0);
}
.rotate-3d-leave-to {
  transform: rotateY(180deg);
}
</style>
