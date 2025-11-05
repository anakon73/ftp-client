import type { RouteRecordInfo, RouteRecordRaw } from 'vue-router'
import { FtpCreateDir, FtpUpload } from '@/modules/ftp'
import { FtpPage } from './ftp'

export const routes: RouteRecordRaw[] = [
  {
    name: 'Ftp',
    path: '/',
    component: FtpPage,
    children: [
      {
        path: 'upload',
        name: 'FtpUpload',
        component: FtpUpload,
      },
      {
        path: 'create-dir',
        name: 'FtpCreateDir',
        component: FtpCreateDir,
      },
    ],
  },
]

export interface RouteNamedMap {
  Ftp: RouteRecordInfo<'Ftp', '/'>
  FtpUpload: RouteRecordInfo<'FtpUpload', '/upload'>
  FtpCreateDir: RouteRecordInfo<'FtpCreateDir', '/create-dir'>
}

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap
  }
}
