import type { VercelRequest, VercelResponse } from '@vercel/node'
import { cors, isAuthenticated, githubFetch } from './_github'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { id } = req.body as { id: number }
  if (!id) return res.status(400).json({ error: 'ID mancante' })

  const ghRes = await githubFetch(`/issues/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ state: 'closed', title: `[DELETED] Issue #${id}` }),
  })

  if (!ghRes.ok) return res.status(500).json({ error: 'Errore eliminazione' })
  return res.status(200).json({ success: true })
}
