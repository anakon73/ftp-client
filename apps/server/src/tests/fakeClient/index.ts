import type { FileEntry } from 'packages/trpc'

const fileType = {
  unknown: 0,
  file: 1,
  directory: 2,
  symbolicLink: 3,
}

export class FakeClient {
  private readonly entities = new Map<string, FileEntry>()

  constructor(entities: FileEntry[] = []) {
    // Add root directory
    this.addDir('/')

    for (const entity of entities) {
      if (entity.type === fileType.directory) {
        this.addDir(entity.name)
      }
      else {
        this.addFile(entity.name, entity.size, entity.modifiedAt)
      }
    }
  }

  private getParent(fullPath: string): string | null {
    const parts = fullPath.split('/').filter(Boolean)
    if (parts.length === 0)
      return null
    if (parts.length === 1)
      return '/'
    return `/${parts.slice(0, -1).join('/')}`
  }

  private getEntities(): FileEntry[] {
    return [...this.entities.entries()]
      .map(([_, entry]) => ({
        ...entry,
      }))
  }

  private getName(fullPath: string): string {
    return fullPath.split('/').filter(Boolean).pop() || ''
  }

  async isInitialized(): Promise<boolean> {
    return this.getEntities()[0].name === '/'
  }

  addDir(path: string): void {
    if (path !== '/') {
      const parent = this.getParent(path)
      if (parent && !this.entities.has(parent))
        throw new Error(`Parent directory does not exist: ${parent}`)
    }

    this.entities.set(path, {
      name: path === '/' ? path : this.getName(path),
      type: fileType.directory,
      size: 0,
      modifiedAt: new Date(),
    })
  }

  addFile(path: string, size: number = 0, modifiedAt: Date = new Date()): void {
    const parent = this.getParent(path)
    if (
      !parent || !this.entities.has(parent)
      || this.entities.get(parent)!.type !== fileType.directory
    ) {
      throw new Error(
        `Parent directory does not exist or is not a directory: ${parent}`,
      )
    }

    this.entities.set(path, {
      name: this.getName(path),
      type: fileType.file,
      size,
      modifiedAt,
    })
  }

  async list(dirPath: string = '/'): Promise<FileEntry[]> {
    const normalized = dirPath.endsWith('/') && dirPath !== '/'
      ? dirPath.slice(0, -1)
      : dirPath

    return [...this.entities.entries()]
      .filter(([fullPath, _]) => this.getParent(fullPath) === normalized)
      .map(([_, entry]) => entry)
  }

  async reset(): Promise<void> {
    this.entities.clear()
    this.addDir('/')
  }

  async remove(path: string): Promise<void> {
    const normalized = path.endsWith('/') ? path.slice(0, -1) : path

    if (path === '/')
      throw new Error('You cannot delete root directory')

    if (!this.entities.has(normalized))
      throw new Error(`File or directory does not exist: ${normalized}`)

    if (this.entities.get(normalized)!.type === fileType.directory) {
      const prefix = `${normalized}/`

      for (const key of this.entities.keys()) {
        if (key.startsWith(prefix)) {
          this.entities.delete(key)
        }
      }
    }

    this.entities.delete(normalized)
  }
}

export function createFakeClient(entities: FileEntry[] = []): FakeClient {
  return new FakeClient(entities)
}
