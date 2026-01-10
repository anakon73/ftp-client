import type { Client, FileInfo } from 'basic-ftp'
import type { Writable } from 'node:stream'

import type { FileEntry } from '../../types'

export type ExtendedFtpClient = Client & { rootDir?: string }

export interface FtpService {
  readonly client: ExtendedFtpClient
  list: (path: string) => Promise<FileEntry[]>
  getEntryType: (path: string) => Promise<FileEntry['type'] | null>
  getFile: (path: string) => Promise<FileEntry | null>
  download: (remotePath: string, writable: Writable) => Promise<void>
  upload: (remotePath: string, buffer: Buffer) => Promise<void>
  delete: (path: string, type: FileEntry['type']) => Promise<void>
  rename: (oldPath: string, newPath: string) => Promise<void>
  createDirectory: (path: string, name: string) => Promise<void>
  move: (oldPath: string, newPath: string) => Promise<void>
  copy: (oldPath: string, newPath: string) => Promise<void>
  close: () => void
}
