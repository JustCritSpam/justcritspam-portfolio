import type { VercelRequest, VercelResponse } from '@vercel/node'
import { cors, githubFetch } from './_github'

const PRIORITY_EMOJI: Record<string, string> = {
  Bassa: '⚪',
  Media: '🔵',
  Alta: '🟡',
  Urgente: '🔴',
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, message, priority } = req.body as {
    name: string
    message: string
    priority: string
  }

  if (!name?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Nome e messaggio sono obbligatori' })
  }

  const allowed = ['Bassa', 'Media', 'Alta', 'Urgente']
  const safePriority = allowed.includes(priority) ? priority : 'Media'
  const emoji = PRIORITY_EMOJI[safePriority]

  const ghRes = await githubFetch('/issues', {
    method: 'POST',
    body: JSON.stringify({
      title: `${emoji} [${safePriority}] Task da ${name.trim()}`,
      body: [
        `**👤 Da:** ${name.trim()}`,
        `**⚡ Priorità:** ${safePriority}`,
        `**📅 Inviato:** ${new Date().toLocaleString('it-IT')}`,
        '',
        '---',
        '',
        message.trim(),
      ].join('\n'),
      labels: ['task'],
    }),
  })

  if (!ghRes.ok) {
    const err = await ghRes.text()
    console.error('GitHub API error:', err)
    return res.status(500).json({ error: 'Errore creazione issue su GitHub' })
  }

  const issue = await ghRes.json() as { number: number }
  return res.status(200).json({ success: true, id: issue.number })
}
