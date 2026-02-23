export type ApiError = { statusCode: number; message: string }

export function toApiError(err: unknown, fallbackStatusCode = 500): ApiError {
  if (typeof err === 'object' && err && 'statusCode' in err && 'message' in err) {
    const statusCode = Number((err as any).statusCode)
    const message = String((err as any).message)
    return { statusCode: Number.isFinite(statusCode) ? statusCode : fallbackStatusCode, message }
  }

  return { statusCode: fallbackStatusCode, message: err instanceof Error ? err.message : 'Unknown error' }
}
