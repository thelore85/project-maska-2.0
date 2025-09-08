const API_URL = import.meta.env.VITE_API_URL

export const authAPI = {
  async login(body: { email: string; password: string }) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json() as Promise<{ token: string; user: { id: string; email: string } }>
  },

  async me(token?: string) {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json() as Promise<{ user: { id: string; email: string } }>
  },
}
