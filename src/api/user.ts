import { baseRequest } from "@/utils/request";

export function login(data: any) {
  return baseRequest({
    url: "/systemservice/v1/sys/login",
    method: "POST",
    data,
  });
}

export function userInfo(data: any) {
  return baseRequest({
    url: "/systemservice/v1/sys/getUserFromSessionToken",
    method: "GET",
    params: data,
  });
}

export function logout(data: any) {
  return baseRequest({
    url: "/systemservice/v1/sys/logout",
    method: "POST",
    data,
  });
}
