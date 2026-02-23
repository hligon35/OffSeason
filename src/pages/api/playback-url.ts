import type { NextApiRequest, NextApiResponse } from 'next'
import { handleGetPlaybackUrl } from '@/api/playback'
import { toApiError } from '@/api/http'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const data = await handleGetPlaybackUrl({
      headers: req.headers as any,
      query: { episodeId: String(req.query.episodeId ?? ''), productId: String(req.query.productId ?? '') },
    })
    return res.status(200).json(data)
  } catch (err) {
    const e = toApiError(err)
    return res.status(e.statusCode).send(e.message)
  }
}
