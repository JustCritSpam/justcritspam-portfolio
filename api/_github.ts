import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

export const GITHUB_OWNER = process.env.GITHUB_OWNER!
export const GITHUB_REPO  = process.env.GITHUB_REPO!
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN!

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!
const ADMIN_SECRET   = process.env.ADMIN_SECRET!

export function getAdminToken(): string {
  return crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(ADMIN_PASSWORD)
    .digest('hex')
}

export function isAuthenticated(req: VercelRequest): boolean {
  const auth = req.headers['authorization'] ?? ''
  const token = auth.replace('Bearer ', '').trim()
  return token === getAdminToken()
}

export function cors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export async function githubFetch(path: string, options: RequestInit = {}) {
  return fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })
}
