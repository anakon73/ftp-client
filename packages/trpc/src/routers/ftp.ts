import * as v from 'valibot'
import { publicProcedure, router } from '../trpc'
import type { FileEntry } from '../types'

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

})
