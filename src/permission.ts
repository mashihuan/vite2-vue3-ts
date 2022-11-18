// import { ElMessage } from 'element-plus'
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

import router from "@/router";
import type { IRouteRecordRaw } from "@/router/types";
import { getToken, removeToken, setToken } from "@/utils/auth"; // get token
import { useUserStore } from "@/store/user";
import { usePermissionStore } from "@/store/permission";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"];

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  // start progress bar
  NProgress.start();

  if (to.query.sessionToken) {
    setToken(to.query.sessionToken);
  }

  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      NProgress.done();
      return "/";
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = userStore.roles.length;
      if (hasRoles) {
        return;
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const userInfo: any = await userStore.getInfo();

          // generate accessible routes map based on roles
          const accessRoutes: any = await permissionStore.generateRoutes(
            userInfo.roles
          );

          accessRoutes.forEach((route: IRouteRecordRaw) => {
            router.addRoute(route);
          });

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          return { ...to, replace: true };
        } catch (error) {
          // remove token and go to login page to re-login
          removeToken();
          NProgress.done();
          return `/login?redirect=${to.path}`;
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      return;
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      NProgress.done();
      return `/login?redirect=${to.path}`;
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
