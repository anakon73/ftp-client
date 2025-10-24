import type { Client } from 'basic-ftp'
import type { FileEntry } from 'packages/trpc'
import type { Writable } from 'node:stream'

export type ExtendedFtpClient = Client & { rootDir?: string }

export interface FtpService {
  readonly client: Client
  list: (path: string) => Promise<FileEntry[]>
  download: (remotePath: string, writable: Writable) => Promise<void>
  delete: (path: string, type: FileEntry['type']) => Promise<void>
  rename: (oldPath: string, newPath: string) => Promise<void>
  createDirectory: (path: string, name: string) => Promise<void>
  move: (oldPath: string, newPath: string) => Promise<void>
  copy: (oldPath: string, newPath: string) => Promise<void>
  close: () => void
}
