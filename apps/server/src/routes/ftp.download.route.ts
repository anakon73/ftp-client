import { Router } from 'express'
import { PassThrough } from 'node:stream'
import { FtpServiceImpl } from '../ftp'
import { getFtpClient } from '../ftp/client/ftp.client'

const router = Router()

router.get('/ftp/download', async (req, res): Promise<any> => {
  const remotePath = req.query.path as string
  if (!remotePath)
    return res.status(400).send('Missing path')

  const client = await getFtpClient()
  const service = new FtpServiceImpl(client)

  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${remotePath.split('/').pop()}"`,
  )

  try {
    const stream = new PassThrough()
    await service.download(remotePath, stream)
    stream.pipe(res)
  }
  catch (error) {
    console.error('Error downloading file:', error)
    res.status(500).send('Error downloading file')
  }
})

export const ftpDownloadRoute = router
