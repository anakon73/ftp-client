import * as v from 'valibot'

import { publicProcedure, router } from '../trpc'
import { db } from './db'

export const userRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = await db.user.findMany()
      return users
    }),
  userById: publicProcedure
    .input(v.string())
    .query(async (opts) => {
      const { input } = opts
      const user = await db.user.findById(input)
      return user
    }),
  userCreate: publicProcedure
    .input(v.object({ name: v.string() }))
    .mutation((opts) => {
      const { input } = opts
      const user = db.user.create(input)
      return user
    }),
})
