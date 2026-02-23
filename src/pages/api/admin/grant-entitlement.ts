import type { NextApiRequest, NextApiResponse } from 'next'
import { handleAdminGrantEntitlement } from '@/api/admin'
import { toApiError } from '@/api/http'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body as any)
    const data = await handleAdminGrantEntitlement({ headers: req.headers as any, body })
    return res.status(200).json(data)
  } catch (err) {
    const e = toApiError(err)
    return res.status(e.statusCode).send(e.message)
  }
}
