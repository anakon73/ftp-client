import { getFtpClient } from '../ftp/client/ftp.client'
import { FtpServiceImpl } from '../ftp'

export async function createContext() {
  return { ftp: new FtpServiceImpl(await getFtpClient()) }
}

export type Context = ReturnType<typeof createContext>
