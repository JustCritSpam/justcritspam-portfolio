import type { VercelRequest, VercelResponse } from '@vercel/node'
import { cors, isAuthenticated, githubFetch } from './_github'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { id, status } = req.body as { id: number; status: 'pending' | 'in_progress' | 'done' }
  if (!id || !status) return res.status(400).json({ error: 'Dati mancanti' })

  const ghState = status === 'done' ? 'closed' : 'open'

  const patchRes = await githubFetch(`/issues/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ state: ghState }),
  })
  if (!patchRes.ok) return res.status(500).json({ error: 'Errore aggiornamento stato' })

  if (status === 'in_progress') {
    await ensureLabel()
    await githubFetch(`/issues/${id}/labels`, {
      method: 'POST',
      body: JSON.stringify({ labels: ['in-corso'] }),
    })
  } else {
    await githubFetch(`/issues/${id}/labels/in-corso`, { method: 'DELETE' })
  }

  return res.status(200).json({ success: true })
}

async function ensureLabel() {
  const check = await githubFetch('/labels/in-corso')
  if (check.status === 404) {
    await githubFetch('/labels', {
      method: 'POST',
      body: JSON.stringify({ name: 'in-corso', color: 'f59e0b', description: 'Task in lavorazione' }),
    })
  }
}
