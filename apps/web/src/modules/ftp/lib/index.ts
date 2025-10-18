import type { FileEntry } from 'packages/trpc'

export function sortFtpEntries(entries: FileEntry[]): FileEntry[] {
  return entries.slice().sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1
    }
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  })
}
