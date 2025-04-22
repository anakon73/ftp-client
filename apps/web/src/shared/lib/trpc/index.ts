import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client'
import type { AppRouter } from 'packages/trpc'
import superjson from 'superjson'

export const trpc = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      transformer: superjson,
    }),
  ],
})
