import { PublicClientApplication, type AccountInfo } from '@azure/msal-browser'
import { msalConfig, loginRequest } from './authConfig'

// Initialize MSAL client
export const msal = new PublicClientApplication(msalConfig)

// Initialize MSAL and handle redirect promise
export async function initializeMsal(): Promise<void> {
    await msal.initialize()
    // Handle redirect promise on page load
    await msal.handleRedirectPromise()
}

// Get active account
export function getActiveAccount(): AccountInfo | null {
    const accounts = msal.getAllAccounts()
    if (accounts.length === 0) return null
    
    // If multiple accounts, return the first one
    return accounts[0]
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    return getActiveAccount() !== null
}

// Login with redirect
export async function loginRedirect(): Promise<void> {
    await msal.loginRedirect(loginRequest)
}

// Login with popup
export async function loginPopup(): Promise<void> {
    await msal.loginPopup(loginRequest)
}

// Get access token
export async function getAccessToken(): Promise<string> {
    const account = getActiveAccount()
    if (!account) {
        throw new Error('No authenticated account found')
    }

    try {
        const response = await msal.acquireTokenSilent({
            ...loginRequest,
            account
        })
        return response.accessToken
    } catch (error) {
        console.warn('Silent token acquisition failed, trying popup:', error)
        try {
            const response = await msal.acquireTokenPopup({
                ...loginRequest,
                account
            })
            return response.accessToken
        } catch (popupError) {
            console.error('Token acquisition failed:', popupError)
            throw new Error(`Authentication failed: ${popupError}`)
        }
    }
}

// Logout
export async function logout(): Promise<void> {
    const account = getActiveAccount()
    if (account) {
        await msal.logoutRedirect({
            account,
            postLogoutRedirectUri: window.location.origin
        })
    }
}
