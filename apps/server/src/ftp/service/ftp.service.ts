import { type Client, FileType, type FTPResponse } from 'basic-ftp'
import type { FileEntry } from 'packages/trpc'

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

  async list(path: string): Promise<FileEntry[]> {
    await this.client.cd(path)

    const list = await this.client.list()

    return list.map(item => ({
      name: item.name,
      type: FileType[item.type as unknown as keyof typeof FileType],
      size: item.size,
      modifiedAt: item.modifiedAt,
    }))
  }

  async upload(localPath: string, remotePath: string): Promise<FTPResponse> {
    return await this.client.uploadFrom(localPath, remotePath)
  }
}
