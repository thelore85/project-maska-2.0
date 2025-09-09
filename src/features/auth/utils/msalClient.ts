import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig, loginRequest } from './authConfig'
export const msal = new PublicClientApplication(msalConfig)
export async function ensureSignedIn() {
  const accounts = msal.getAllAccounts()
  if (accounts.length === 0) {
    await msal.loginRedirect(loginRequest)
  }
}
export async function getAccessToken(): Promise<string> {
  const account = msal.getAllAccounts()[0]
  try {
    const r = await msal.acquireTokenSilent({ ...loginRequest, account })
    return r.accessToken
  } catch {
    await msal.acquireTokenRedirect({ ...loginRequest, account })
    return '' // tras el redirect, la app vuelve y repites la llamada
  }
}
export function logout() {
  return msal.logoutRedirect()
}
