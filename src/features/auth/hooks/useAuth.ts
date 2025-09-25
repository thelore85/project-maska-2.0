import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import { isAuthenticated, getActiveAccount, loginRedirect, loginPopup, logout as msalLogout, getAccessToken, msal } from '../utils/msalClient'

interface UseAuthReturn {
    isAuthenticated: boolean
    user: { id: string; email: string } | null
    login: (usePopup?: boolean) => Promise<void>
    logout: () => Promise<void>
    getToken: () => Promise<string>
    isLoading: boolean
}

export function useAuth(): UseAuthReturn {
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()
    const { isAuthenticated: storeAuth, logout: clearStore, setToken } = useAuthStore()
    const { user } = useUserStore()

    // Sync MSAL state with store on mount and account changes
    useEffect(() => {
        const syncAuthState = async () => {
            const account = getActiveAccount()
            if (account && isAuthenticated() && !storeAuth) {
                // User is authenticated in MSAL but not in store
                try {
                    const token = await getAccessToken()
                    setToken(token)
                } catch (error) {
                    console.error('❌ Failed to get token:', error)
                }
            } else if (!account && storeAuth) {
                // User is not authenticated in MSAL but is in store
                clearStore()
            }
        }

        syncAuthState()

        // Listen for account changes
        const callbackId = msal.addEventCallback((event) => {
            if (event.eventType === 'msal:loginSuccess' || event.eventType === 'msal:logoutSuccess' || event.eventType === 'msal:accountAdded' || event.eventType === 'msal:accountRemoved') {
                syncAuthState()
            }
        })

        return () => {
            msal.removeEventCallback(callbackId as string)
        }
    }, [storeAuth, clearStore, setToken])

    const login = async (usePopup = false): Promise<void> => {
        try {
            setIsLoading(true)
            if (usePopup) {
                await loginPopup()
            } else {
                await loginRedirect()
            }
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async (): Promise<void> => {
        try {
            setIsLoading(true)

            // Invalida tutte le query auth prima del logout
            queryClient.removeQueries({ queryKey: ['auth'] })

            clearStore() // Clear store first
            await msalLogout() // Then logout from MSAL
        } catch (error) {
            console.error('Logout failed:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const getToken = async (): Promise<string> => {
        try {
            return await getAccessToken()
        } catch (error) {
            console.error('Token acquisition failed:', error)
            // If token acquisition fails, user might need to re-authenticate
            clearStore()
            throw error
        }
    }

    // Converti user della userStore nel formato atteso da useAuth
    const userForAuth = user ? {
        id: user.id.toString(),
        email: user.email
    } : null

    return {
        isAuthenticated: isAuthenticated() && storeAuth,
        user: userForAuth,
        login,
        logout,
        getToken,
        isLoading
    }
}
