import * as v from 'valibot'
import { Writable } from 'node:stream'
import path from 'node:path'

import type { FileEntry } from '../../types'
import { publicProcedure, router } from '../trpc'

export const ftpRouter = router({
  list: publicProcedure
    .input(v.object({ path: v.optional(v.string(), '/') }))
    .query(async ({ input, ctx }) => {
      return (await ctx).ftp.list(input.path)
    }),
  delete: publicProcedure
    .input(v.object({
      path: v.string(),
      type: v.custom<FileEntry['type']>(() => true),
    }))
    .mutation(async ({ input, ctx }) => {
      return (await ctx).ftp.delete(input.path, input.type)
    }),
  rename: publicProcedure
    .input(v.object({ oldPath: v.string(), newPath: v.string() }))
    .mutation(async ({ input, ctx }) => {
      return (await ctx).ftp.rename(input.oldPath, input.newPath)
    }),
  createDirectory: publicProcedure
    .input(v.object({ path: v.string(), name: v.string() }))
    .mutation(async ({ input, ctx }) => {
      return (await ctx).ftp.createDirectory(input.path, input.name)
    }),
  move: publicProcedure
    .input(v.object({ oldPath: v.string(), newPath: v.string() }))
    .mutation(async ({ input, ctx }) => {
      return (await ctx).ftp.move(input.oldPath, input.newPath)
    }),
  copy: publicProcedure
    .input(v.object({ oldPath: v.string(), newPath: v.string() }))
    .mutation(async ({ input, ctx }) => {
      return (await ctx).ftp.copy(input.oldPath, input.newPath)
    }),
  download: publicProcedure
    .input(v.object({ path: v.string() }))
    .query(async ({ input, ctx }) => {
      const ftp = (await ctx).ftp

      const chunks: Buffer[] = []
      const writable = new Writable({
        write(chunk, _encoding, callback) {
          chunks.push(Buffer.from(chunk))
          callback()
        },
      })

      const fullPath = input.path.startsWith('/')
        ? input.path
        : path.posix.join(ftp.client.rootDir!, input.path)

      await ftp.download(fullPath, writable)

      const buffer = Buffer.concat(chunks)
      return buffer.toString('base64')
    }),
  upload: publicProcedure
    .input(v.object({
      path: v.string(),
      fileName: v.string(),
      base64: v.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const ftp = (await ctx).ftp
      const buffer = Buffer.from(input.base64, 'base64')
      await ftp.upload(path.posix.join(input.path, input.fileName), buffer)
      return { message: '✅ Uploaded successfully' }
    }),
})
