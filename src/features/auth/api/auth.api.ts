import { ensureSignedIn, getAccessToken } from '../utils/msalClient'
const API_BASE = import.meta.env.VITE_API_BASE

export async function callMe() {
  await ensureSignedIn()
  const token = await getAccessToken()

  const r = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!r.ok) throw new Error(`API error ${r.status}`)

  console.log('//////////r.json()', r.json())

  return r.json()
}
