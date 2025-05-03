import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import dotenv from 'dotenv'
import { appRouter } from 'packages/trpc'
import { createContext } from './context'

dotenv.config()

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
}))

app.listen(3000)
