import fs from 'node:fs'
import path from 'node:path'
import { Readable, type Writable } from 'node:stream'
import { createReadStream } from 'streamifier'
import { FileType } from 'basic-ftp'

import { getEntryType } from '../../utils/fileType'
import { buildFtpPath } from '../../utils/resolveFtpPath'
import type { FileEntry } from '../../types'

import type { ExtendedFtpClient, FtpService } from '../types'

export class FtpServiceImpl implements FtpService {
  private _client: ExtendedFtpClient

  constructor(client: ExtendedFtpClient) {
    this._client = client
  }

  get client(): ExtendedFtpClient {
    return this._client
  }

  set client(client: ExtendedFtpClient) {
    this._client = client
  }

  get rootDir() {
    return (this.client as any).rootDir
  }

  private getPathWithRootDir(path: string): string {
    return buildFtpPath(this.client, path)
  }

  async list(path: string): Promise<FileEntry[]> {
    await this.client.cd(this.getPathWithRootDir(path))

    const list = await this.client.list()

    return list.map(item => ({
      name: item.name,
      type: getEntryType(item.type),
      size: item.size,
      modifiedAt: item.modifiedAt,
    }))
  }

  async getEntryType(path: string): Promise<FileEntry['type'] | null> {
    if (path === '/' || !path)
      return getEntryType(FileType.Directory)

    try {
      await this.client.list(this.getPathWithRootDir(path))
      return getEntryType(FileType.Directory)
    }
    catch {
      const parentPath = path.split('/').slice(0, -1).join('/') || '/'
      const targetName = path.split('/').pop()

      const list = await this.list(parentPath)
      const entry = list.find(e => e.name === targetName)

      if (!entry)
        return null

      return entry.type
    }
  }

  async download(remotePath: string, writable: Writable): Promise<void> {
    const fullPath = path.posix.join((this.client as any).rootDir, remotePath)
    await this.client.downloadTo(writable, fullPath)
  }

  async upload(remotePath: string, buffer: Buffer): Promise<void> {
    const stream = Readable.from(buffer)
    const fullPath = path.posix.join((this.client as any).rootDir!, remotePath)
    await this.client.uploadFrom(stream, fullPath)
  }

  async delete(path: string, type: FileEntry['type']): Promise<void> {
    if (type === 'directory')
      await this.client.removeDir(this.getPathWithRootDir(path))
    else await this.client.remove(this.getPathWithRootDir(path))
  }

  async rename(oldPath: string, newPath: string): Promise<void> {
    await this.client.rename(
      this.getPathWithRootDir(oldPath),
      this.getPathWithRootDir(newPath),
    )
  }

  async createDirectory(path: string, name: string): Promise<void> {
    await this.client.ensureDir(`${this.getPathWithRootDir(path)}/${name}`)
  }

  async move(oldPath: string, newPath: string): Promise<void> {
    await this.client.rename(
      this.getPathWithRootDir(oldPath),
      this.getPathWithRootDir(newPath),
    )
  }

  async copy(oldPath: string, newPath: string): Promise<void> {
    const tempPath = path.join(__dirname, 'temp-file')

    try {
      await this.client.downloadTo(tempPath, this.getPathWithRootDir(oldPath))

      const fileBuffer = fs.readFileSync(tempPath)

      const fileStream = createReadStream(fileBuffer)

      await this.client.uploadFrom(fileStream, this.getPathWithRootDir(newPath))
    }
    catch (error) {
      console.error('FTP copy failed', error)
      throw error
    }
    finally {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath)
      }
    }
  }

  close(): void {
    this.client.close()
  }
}
