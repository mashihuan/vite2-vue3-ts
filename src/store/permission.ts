import { defineStore } from "pinia";

import { asyncRoutes, constantRoutes } from "@/router";
import type { IRouteRecordRaw } from "@/router/types";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: IRouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: string) => route.meta!.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: IRouteRecordRaw[], roles: string[]) {
  const res: IRouteRecordRaw[] = [];

  routes.forEach((route: IRouteRecordRaw) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

export const usePermissionStore = defineStore("permission", {
  state: () => {
    return {
      routes: new Array<IRouteRecordRaw>(),
      addRoutes: new Array<IRouteRecordRaw>(),
    };
  },
  getters: {},
  actions: {
    generateRoutes(roles: string[]) {
      return new Promise((resolve) => {
        let accessedRoutes: IRouteRecordRaw[];
        if (roles.includes("admin")) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        this.addRoutes = accessedRoutes;
        this.routes = constantRoutes.concat(accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
});
