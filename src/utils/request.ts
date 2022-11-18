import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

import router from "@/router";
import { getToken, removeToken } from "@/utils/auth";

const baseRequest: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 60000,
});

// 请求拦截
const requestInterceptors = [
  (config: AxiosRequestConfig) => {
    config.headers!.sessionToken = getToken() || "dev";
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  },
];

// 响应拦截
const responseInterceptors = [
  (res: AxiosResponse) => {
    if (
      res.data.return_code !== 20000 &&
      res.data.returnCode !== 20000 &&
      res.data.returnCode !== 0
    ) {
      ElMessage({
        message: res.data.return_msg || res.data.returnMsg || "Error",
        type: "error",
        duration: 3000,
      });
      // 其余情况，在此进行特殊处理
      return Promise.reject(
        new Error(res.data.return_msg || res.data.returnMsg || "Error")
      );
    } else {
      return res.data;
    }
  },
  (err: any) => {
    ElMessage({
      message: err.message,
      type: "error",
      duration: 300000,
    });
    if (err.response.status === 401) {
      removeToken();
      router.push("/login");
    }
    return Promise.reject(err);
  },
];

baseRequest.interceptors.request.use(...requestInterceptors);
baseRequest.interceptors.response.use(...responseInterceptors);

export { baseRequest };
