import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { appRouter } from 'packages/trpc'

import * as trpcExpress from '@trpc/server/adapters/express'

import { ftpDownloadRoute } from './routes/ftp.download.route'
import { ftpUploadRoute } from './routes/ftp.upload.route'

import { createContext } from './context'

dotenv.config()

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
}))

app.use([ftpDownloadRoute, ftpUploadRoute])

app.listen(3000)
