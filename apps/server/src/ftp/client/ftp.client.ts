import { Client } from 'basic-ftp'

const client = new Client()

export async function getFtpClient() {
  if (!client.closed)
    return client

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: true,
      secureOptions: {
        rejectUnauthorized: false,
      },
    })
  }
  catch (error) {
    throw new Error(`Error during FTP operation:${error}`)
  }

  return client
}
