import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => {
    return {
      isCollapse: false,
    };
  },
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
