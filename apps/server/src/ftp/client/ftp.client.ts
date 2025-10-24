import { Client } from 'basic-ftp'
import type { ExtendedFtpClient } from '../types'

const client = new Client()

export async function getFtpClient(): Promise<ExtendedFtpClient> {
  if (!client.closed)
    return client

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: true,
      secureOptions: {
        rejectUnauthorized: false,
      },
    })
  }
  catch (error) {
    throw new Error(`Error during FTP operation:${error}`)
  }

  const cwd = await client.pwd()
  const list = await client.list(cwd)
  const rootDir: string = list.find(item => item.isDirectory)?.name ?? '';
  (client as ExtendedFtpClient).rootDir = `/${rootDir}`
  return client
}
