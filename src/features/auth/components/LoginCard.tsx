import Button from '@/components/cta/Button'
import { useAuth } from '../hooks/useAuth'
import { callMe } from '../api/auth.api'
import { useState } from 'react'

export default function LoginCard() {
    const { isAuthenticated, user, login, logout, getToken, isLoading } = useAuth()
    const [apiData, setApiData] = useState<any>(null)
    const [apiLoading, setApiLoading] = useState(false)

    const handleLogin = async (usePopup: boolean = false) => {
        try {
            await login(usePopup)
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
            setApiData(null)
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const handleGetToken = async () => {
        try {
            const token = await getToken()
            console.log('🔑 Current token:', token ? token : 'NULL')
        } catch (error) {
            console.error('Token retrieval failed:', error)
        }
    }

    const handleApiCall = async () => {
        try {
            setApiLoading(true)
            const data = await callMe()
            setApiData(data)
        } catch (error) {
            console.error('API call failed:', error)
            setApiData({ error: error instanceof Error ? error.message : 'Unknown error' })
        } finally {
            setApiLoading(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Authentication Required</h2>
                <div className="space-x-2">
                    {/* <Button variant="primary" onClick={() => handleLogin(false)} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Login (Redirect)'}
                    </Button> */}
                    <Button variant="secondary" onClick={() => handleLogin(true)} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Login (Popup)'}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="rounded bg-green-50 p-4">
                <h2 className="text-xl font-bold text-green-800">Authenticated ✅</h2>
                <p className="text-green-600">User: {user?.email}</p>
                <p className="text-green-600">ID: {user?.id}</p>
            </div>

            <div className="space-x-2">
                <Button variant="tertiary" onClick={handleGetToken} disabled={isLoading}>
                    Show Token
                </Button>
                <Button variant="primary" onClick={handleApiCall} disabled={apiLoading}>
                    {apiLoading ? 'Loading...' : 'Call API /auth/me'}
                </Button>
                <Button variant="secondary" onClick={handleLogout} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Logout'}
                </Button>
            </div>

            {apiData && (
                <div className="mt-4 rounded bg-gray-50 p-4">
                    <h3 className="font-bold">API Response:</h3>
                    <pre className="overflow-auto text-sm">{JSON.stringify(apiData, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}
