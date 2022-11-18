<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/store/user";
import { title } from "@/settings";
import { logout } from "@/api/user";
import { getToken, removeToken } from "@/utils/auth";

const router = useRouter();
const userStore = useUserStore();
const logoutLoading = ref(false);

const handleLogout = () => {
  logoutLoading.value = true;
  logout({
    sessionToken: getToken(),
  })
    .then(() => {
      logoutLoading.value = false;
      removeToken();
      userStore.setRoles([]);
      router.push("/login");
    })
    .catch(() => {
      logoutLoading.value = false;
    });
};
</script>

<template>
  <div class="app-header">
    <div class="logo-wrap">
      <img class="logo" src="@/assets/img/logo.png" alt="" />
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="user-wrap">
      <img class="avatar" src="@/assets/img/avatar.png" alt="" />
      <div class="name">{{ userStore.userInfo.name }}</div>
      <el-button
        size="small"
        class="logout"
        type="primary"
        :loading="logoutLoading"
        @click="handleLogout"
      >
        退出
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  height: 60px;
  background: #001529;
  color: #fff;
  .logo-wrap {
    display: flex;
    align-items: center;
    .logo {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
    .title {
      font-size: 22px;
    }
  }
  .user-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 28px;
      height: 28px;
      margin-right: 5px;
    }
    .logout {
      margin-left: 10px;
    }
  }
}
</style>
