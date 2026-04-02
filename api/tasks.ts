import type { VercelRequest, VercelResponse } from '@vercel/node'
import { cors, isAuthenticated, githubFetch } from './_github'

export interface GithubIssue {
  number: number
  title: string
  body: string
  state: 'open' | 'closed'
  created_at: string
  labels: { name: string }[]
  html_url: string
}

function parseIssue(issue: GithubIssue) {
  const priorityMatch = issue.title.match(/\[(Bassa|Media|Alta|Urgente)\]/)
  const priority = priorityMatch ? priorityMatch[1] : 'Media'

  const nameMatch = issue.title.match(/Task da (.+)$/)
  const name = nameMatch ? nameMatch[1] : 'Sconosciuto'

  const bodyLines = (issue.body ?? '').split('\n')
  const descStart = bodyLines.findIndex(l => l === '---')
  const message = descStart >= 0
    ? bodyLines.slice(descStart + 2).join('\n').trim()
    : issue.body?.trim() ?? ''

  const inProgress = issue.labels.some(l => l.name === 'in-corso')
  const status = issue.state === 'closed' ? 'done' : inProgress ? 'in_progress' : 'pending'

  return {
    id: issue.number,
    name,
    message,
    priority,
    status,
    created_at: issue.created_at,
    url: issue.html_url,
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  const page  = req.query.page ?? '1'
  const state = (req.query.state as string) ?? 'open'

  const ghRes = await githubFetch(
    `/issues?state=${state}&labels=task&per_page=50&page=${page}&sort=created&direction=desc`
  )

  if (!ghRes.ok) return res.status(500).json({ error: 'Errore GitHub API' })

  const issues = await ghRes.json() as GithubIssue[]
  return res.status(200).json(issues.map(parseIssue))
}
