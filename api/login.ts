import type { VercelRequest, VercelResponse } from '@vercel/node'
import { cors, getAdminToken } from './_github'

export default function handler(req: VercelRequest, res: VercelResponse) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { password } = req.body as { password: string }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Password errata' })
  }

  return res.status(200).json({ token: getAdminToken() })
}
