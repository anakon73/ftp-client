import * as v from 'valibot'
import { publicProcedure, router } from '../trpc'

export const ftpRouter = router({
  list: publicProcedure
    .input(v.object({ path: v.optional(v.string(), '/') }))
    .query(async ({ input, ctx }) => {
      return (await ctx).ftp.list(input.path)
    }),
  upload: publicProcedure
    .input(v.object({ localPath: v.string(), remotePath: v.string() }))
    .mutation(async ({ input, ctx }) => {
      return (await ctx).ftp.upload(input.localPath, input.remotePath)
    }),
  delete: publicProcedure
    .input(v.object({ path: v.string() }))
    .mutation(async ({ input, ctx }) => {
      return (await ctx).ftp.delete(input.path)
    }),
  rename: publicProcedure
    .input(v.object({ oldPath: v.string(), newPath: v.string() }))
    .mutation(async ({ input, ctx }) => {
      return (await ctx).ftp.rename(input.oldPath, input.newPath)
    }),
  createDirectory: publicProcedure
    .input(v.object({ path: v.string() }))
    .mutation(async ({ input, ctx }) => {
      return (await ctx).ftp.createDirectory(input.path)
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
