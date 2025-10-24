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
    const targetDir = path.join(process.cwd(), 'temp_uploads')

    try {
      const client = await getFtpClient()
      const file = req.file
      if (!file)
        return res.status(400).json({ error: 'No file uploaded' })

      await fs.mkdir(targetDir, { recursive: true })
      const targetPath = path.join(targetDir, file.originalname)

      await fs.writeFile(targetPath, file.buffer)

      const currentPath = req.body.currentPath
        ? path.posix.join(client.rootDir!, req.body.currentPath)
        : client.rootDir!

      const remotePath = path.posix.join(currentPath, file.originalname)

      await client.uploadFrom(targetPath, remotePath)

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
