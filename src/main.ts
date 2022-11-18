import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Particles from "vue3-particles"; // 粒子插件

import App from "./App.vue";
import router from "./router";

import "@/assets/css/reset.scss";
import "./permission";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);
app.use(Particles);
app.use(createPinia());
app.use(router);

app.mount("#app");
