import { ftpRouter } from './routers'
import { router } from './trpc'

export const appRouter = router({
  ftp: ftpRouter,
})

export * from './types'
