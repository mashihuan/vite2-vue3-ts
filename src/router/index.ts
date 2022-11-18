import { createRouter, createWebHashHistory } from "vue-router";

import type { IRouteRecordRaw } from "./types";

import Layout from "@/layouts/default.vue";

export const constantRoutes: IRouteRecordRaw[] = [
  {
    path: "/login",
    hidden: true,
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/404",
    hidden: true,
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: Layout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "Dashboard", icon: "Odometer" },
      },
    ],
  },
  {
    path: "/nested",
    redirect: "/nested/menu1/menu1-1",
    component: Layout,
    meta: { title: "Nested Routes", icon: "Operation" },
    children: [
      {
        path: "/nested/menu1",
        redirect: "/nested/menu1/menu1-1",
        component: () => import("@/views/nested/menu1/index.vue"),
        meta: { title: "Menu 1" },
        children: [
          {
            path: "/nested/menu1/menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1/index.vue"),
            meta: { title: "Menu 1-1" },
          },
          {
            path: "/nested/menu1/menu1-2",
            redirect: "/nested/menu1/menu1-2-1",
            component: () => import("@/views/nested/menu1/menu1-2/index.vue"),
            meta: { title: "Menu 1-2" },
            children: [
              {
                path: "/nested/menu1/menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1/index.vue"),
                meta: { title: "Menu 1-2-1" },
              },
              {
                path: "/nested/menu1/menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2/index.vue"),
                meta: { title: "Menu 1-2-2" },
              },
            ],
          },
          {
            path: "/nested/menu1/menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3/index.vue"),
            meta: { title: "Menu 1-3" },
          },
        ],
      },
      {
        path: "/nested/menu2",
        component: () => import("@/views/nested/menu2/index.vue"),
        meta: { title: "Menu 2" },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    hidden: true,
    redirect: "/404",
  },
];

export const asyncRoutes: IRouteRecordRaw[] = [];

const router = createRouter({
  routes: constantRoutes,
  history: createWebHashHistory(),
});

export default router;
