import { getPayload as getPayloadInit } from 'payload'
import config from '@payload-config'

let cachedPayload: any = null

/**
 * Singleton getter for Payload CMS client in server components and server actions
 */
export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload
  }

  const payload = await getPayloadInit({ config })
  cachedPayload = payload
  return payload
}
