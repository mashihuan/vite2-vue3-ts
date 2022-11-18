/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "nprogress"; // progress bar
declare module "tsparticles"; // 粒子插件
declare module "vue3-particles";
declare module "uuid";
declare module "path-browserify";
declare module "vue3-count-to";
