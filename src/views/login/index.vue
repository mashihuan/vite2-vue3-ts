<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";

import { login } from "@/api/user";
import { useParticles } from "./hook";
import { title } from "@/settings";
import { setToken } from "@/utils/auth";
import { generateUuid } from "@/utils/uuid";

const route = useRoute();
const router = useRouter();
const [particlesInit, particlesOptions] = useParticles();
const loginLoading = ref(false);
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  loginName: "",
  password: "",
});
const rules = reactive<FormRules>({
  loginName: [
    { required: true, message: "请输入账号", trigger: ["trigger", "change"] },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: ["trigger", "change"] },
  ],
});

const onLogin = async () => {
  await loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      loginLoading.value = true;
      await login({
        ...loginForm,
        sessionToken: generateUuid(),
      })
        .then((res: any) => {
          loginLoading.value = false;
          setToken(res.sessionToken);
          router.push((route.query.redirect as RouteLocationRaw) || "/");
        })
        .catch(() => {
          loginLoading.value = false;
        });
    }
  });
};
</script>

<template>
  <div class="login">
    <div class="login-inner">
      <el-card class="box-card">
        <template #header>
          <h2 class="title">{{ title }}</h2>
        </template>
        <el-form
          ref="loginFormRef"
          label-width="0px"
          :model="loginForm"
          :rules="rules"
          size="large"
        >
          <el-form-item label="" prop="loginName">
            <el-input
              clearable
              v-model="loginForm.loginName"
              placeholder="请输入账号"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              show-password
              clearable
              v-model="loginForm.password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              @keyup.enter="onLogin"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="login-btn"
              @click.prevent="onLogin"
              :loading="loginLoading"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="particlesOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  .login-inner {
    position: relative;
    width: 410px;
    max-width: 90%;
    padding-top: 150px;
    margin: 0 auto;
    text-align: center;
    z-index: 1;
    .title {
      /* margin-bottom: 60px; */
      font-size: 28px;
      font-weight: bold;
    }
    .login-btn {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
