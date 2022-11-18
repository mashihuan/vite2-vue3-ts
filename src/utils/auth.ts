const TokenKey: string = "sessionToken";

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token: any) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}
