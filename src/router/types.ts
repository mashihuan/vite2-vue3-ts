import type { RouteRecordRaw } from "vue-router";

export interface IMeta {}

export interface IRouteItem {
  meta?: any;
  hidden?: boolean;
  alwaysShow?: boolean;
  noShowingChildren?: boolean;
}

export type IRouteRecordRaw = RouteRecordRaw & IRouteItem;
