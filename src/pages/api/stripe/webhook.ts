import type { NextApiRequest, NextApiResponse } from 'next'
import { handleStripeWebhook } from '@/api/stripe'
import { toApiError } from '@/api/http'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function readRawBody(req: NextApiRequest): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  return Buffer.concat(chunks).toString('utf8')
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const rawBody = await readRawBody(req)
    const sig = (req.headers['stripe-signature'] as string | undefined) ?? null
    await handleStripeWebhook(rawBody, sig)
    return res.status(200).json({ received: true })
  } catch (err) {
    const e = toApiError(err)
    return res.status(e.statusCode).send(e.message)
  }
}
