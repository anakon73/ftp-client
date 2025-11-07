import { FileType } from 'basic-ftp'
import type { FileEntry } from '../types'

export function getEntryType(type: FileType): FileEntry['type'] {
  switch (type) {
    case FileType.Directory:
      return 'directory'
    case FileType.File:
      return 'file'
    case FileType.SymbolicLink:
      return 'symbolicLink'
    default:
      return 'unknown'
  }
}
