import path from 'node:path'
import { promises as fs } from 'node:fs'
import multer from 'multer'
import { Router } from 'express'

import { getFtpClient } from '../ftp/client/ftp.client'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
})

async function cleanUpDir(dirPath: string) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true })
  }
  catch (err) {
    console.warn(`⚠️ Failed to remove directory ${dirPath}:`, err)
  }
}

router.post(
  '/upload',
  upload.single('file'),
  async (req, res): Promise<any> => {
    const targetDir = path.join(process.cwd(), 'ftp-node')

    try {
      const file = req.file
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      await fs.mkdir(targetDir, { recursive: true })

      const targetPath = path.join(targetDir, file.originalname)

      await fs.writeFile(targetPath, file.buffer)

      const client = await getFtpClient()
      await client.uploadFrom(targetPath, `/ftp-node/${file.originalname}`)

      await fs.unlink(targetPath)

      await cleanUpDir(targetDir)

      res.json({
        message: '✅ Uploaded successfully and cleaned up',
        filename: file.originalname,
      })
    }
    catch (err) {
      console.error('❌ Upload error:', err)

      await cleanUpDir(targetDir)

      res.status(500).json({ error: 'Upload failed' })
    }
  },
)

export const ftpUploadRoute = router
