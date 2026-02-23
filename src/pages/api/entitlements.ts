import type { NextApiRequest, NextApiResponse } from 'next'
import { handleGetEntitlements } from '@/api/entitlements'
import { toApiError } from '@/api/http'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const data = await handleGetEntitlements({ headers: req.headers as any })
    return res.status(200).json(data)
  } catch (err) {
    const e = toApiError(err)
    return res.status(e.statusCode).send(e.message)
  }
}
