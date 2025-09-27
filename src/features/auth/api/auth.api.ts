import { getAccessToken } from '../utils/msalClient'
const API_BASE = import.meta.env.VITE_API_BASE

export async function callMe() {
  try {
    const token = await getAccessToken()
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`API auth.callMe() error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('callMe failed:', error)
    throw error
  }
}
