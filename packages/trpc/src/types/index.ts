import type { appRouter } from '..'

export interface User {
  id: string
  name: string
}

export type AppRouter = typeof appRouter
