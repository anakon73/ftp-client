import type { Client, FTPResponse } from 'basic-ftp'
import type { FileEntry } from 'packages/trpc'
import type { Writable } from 'node:stream'

export interface FtpService {
  readonly client: Client
  list: (path: string) => Promise<FileEntry[]>
  upload: (localPath: string, remotePath: string) => Promise<FTPResponse>
  download: (remotePath: string, writable: Writable) => Promise<void>
  delete: (path: string) => Promise<void>
  rename: (oldPath: string, newPath: string) => Promise<void>
  createDirectory: (path: string) => Promise<void>
  move: (oldPath: string, newPath: string) => Promise<void>
  copy: (oldPath: string, newPath: string) => Promise<void>
  close: () => void
}
