export interface FileEntry {
  name: string
  type: 'unknown' | 'directory' | 'file' | 'symbolicLink'
  size: number
  modifiedAt?: Date
}
