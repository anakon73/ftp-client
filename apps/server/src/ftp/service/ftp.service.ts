import fs from 'node:fs'
import path from 'node:path'
import type { Writable } from 'node:stream'
import { createReadStream } from 'streamifier'
import type { Client } from 'basic-ftp'
import type { FileEntry } from 'packages/trpc'

import { getFileType } from '../../utils/fileType'
import { buildFtpPath } from '../../utils/resolveFtpPath'
import type { FtpService } from '../types'

export class FtpServiceImpl implements FtpService {
  private _client: Client

  constructor(client: Client) {
    this._client = client
  }

  get client(): Client {
    return this._client
  }

  set client(client: Client) {
    this._client = client
  }

  private getPathWithRootDir(path: string): string {
    return buildFtpPath(this.client, path)
  }

  async list(path: string): Promise<FileEntry[]> {
    await this.client.cd(this.getPathWithRootDir(path))

    const list = await this.client.list()

    return list.map(item => ({
      name: item.name,
      type: getFileType(item.type),
      size: item.size,
      modifiedAt: item.modifiedAt,
    }))
  }

  async download(remotePath: string, writable: Writable): Promise<void> {
    await this.client.downloadTo(writable, remotePath)
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
