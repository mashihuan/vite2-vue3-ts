import { defineStore } from "pinia";

import { getToken } from "@/utils/auth";
import { userInfo } from "@/api/user";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: getToken(),
      userInfo: {
        name: "",
      },
      roles: [],
    };
  },
  getters: {},
  actions: {
    getInfo() {
      return new Promise((resolve, reject) => {
        userInfo({ sessionToken: getToken() })
          .then((response) => {
            const { roles } = response.data;
            this.userInfo = response.data || {};
            this.roles = roles;
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setRoles(roles: any) {
      this.roles = roles;
    },
  },
});
