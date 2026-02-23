import type { NextApiRequest, NextApiResponse } from 'next'
import { handleCreateCheckoutSession } from '@/api/stripe'
import { toApiError } from '@/api/http'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const origin = `${req.headers['x-forwarded-proto'] ?? 'http'}://${req.headers.host}`
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body as any)
    const data = await handleCreateCheckoutSession({ headers: req.headers as any, body, origin })
    return res.status(200).json(data)
  } catch (err) {
    const e = toApiError(err)
    return res.status(e.statusCode).send(e.message)
  }
}
