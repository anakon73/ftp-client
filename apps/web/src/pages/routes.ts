import type { RouteRecordInfo, RouteRecordRaw } from 'vue-router'
import { FtpWrapperPage } from './ftp-wrapper'

export const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'Ftp',
    component: FtpWrapperPage,
  },

]

export interface RouteNamedMap {
  Ftp: RouteRecordInfo<'Ftp', '/:pathMatch(.*)*'>
}

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap
  }
}
