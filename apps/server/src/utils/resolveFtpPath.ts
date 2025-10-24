import path from 'node:path'
import type { ExtendedFtpClient } from '../ftp/types'

export function buildFtpPath(
  client: ExtendedFtpClient,
  inputPath: string,
): string {
  const root = client.rootDir || ''
  return path.posix.join(root, inputPath)
}
