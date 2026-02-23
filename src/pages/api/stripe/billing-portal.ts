import type { NextApiRequest, NextApiResponse } from 'next'
import { handleCreateBillingPortalSession } from '@/api/stripe'
import { toApiError } from '@/api/http'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const origin = `${req.headers['x-forwarded-proto'] ?? 'http'}://${req.headers.host}`
    const data = await handleCreateBillingPortalSession({ headers: req.headers as any, origin })
    return res.status(200).json(data)
  } catch (err) {
    const e = toApiError(err)
    return res.status(e.statusCode).send(e.message)
  }
}
