import type { Client, FTPResponse } from 'basic-ftp'
import type { FileEntry } from 'packages/trpc'

export interface FtpService {
  readonly client: Client
  list: (path: string) => Promise<FileEntry[]>
  upload: (localPath: string, remotePath: string) => Promise<FTPResponse>
}
