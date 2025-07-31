import type { RouteRecordInfo, RouteRecordRaw } from 'vue-router'
import { FtpPage } from './ftp'

export const routes: RouteRecordRaw[] = [
  {
    name: 'Ftp',
    path: '/',
    component: FtpPage,
  },
]

export interface RouteNamedMap {
  Ftp: RouteRecordInfo<'Ftp', '/'>
}

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap
  }
}
