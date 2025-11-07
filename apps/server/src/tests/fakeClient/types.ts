import type { Writable } from 'node:stream'
import type { FTPResponse } from 'basic-ftp'

import type { FileEntry } from '../../types'

export interface IFtpFakeClient {
  isInitialized: () => Promise<boolean>
  reset: () => Promise<void>
  cd: (path: string) => Promise<void>
  list: () => Promise<FileEntry[]>
  uploadFrom: (localPath: string, remotePath: string) => Promise<FTPResponse>
  downloadTo: (writable: Writable, remotePath: string) => Promise<void>
  remove: (path: string) => Promise<void>
  rename: (oldPath: string, newPath: string) => Promise<void>
  ensureDir: (path: string) => Promise<void>
  close: () => Promise<void>
}
