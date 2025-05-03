import type { FileType } from 'basic-ftp'
import type { appRouter } from '..'

export interface FileEntry {
  name: string
  type: FileType
  size: number
  modifiedAt?: Date
}

export type AppRouter = typeof appRouter
