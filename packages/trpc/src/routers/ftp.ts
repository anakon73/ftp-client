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
})
