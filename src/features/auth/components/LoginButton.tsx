import Button from '@/components/cta/Buttons'
import { useAuthStore } from '@/store/authStore'
import { useAzureLogin } from '../api/auth.hooks'
import { logout } from '../utils/msalClient'
import { callMe } from '../api/auth.api'

export default function LoginButton() {
    const { logout: logoutStore } = useAuthStore()
    const { data, isLoading, refetch } = useAzureLogin(false)

    const handleLogout = () => {
        logoutStore() // Pulisce lo store
        logout() // Logout da MSAL
    }

    const handleDirectCall = async () => {
        await callMe()
    }

    return (
        <>
            <Button variant="primary" onClick={() => refetch()}>
                {isLoading ? 'Loading...' : "FETCH API 'call me'"}
            </Button>
            <Button variant="tertiary" onClick={() => handleDirectCall()}>
                DIRECT FETCH API /auth/me
            </Button>
            <Button variant="tertiary" onClick={() => handleLogout()}>
                Logout
            </Button>

            <div className="mt-10 mb-4 rounded-4xl bg-gray-50 px-4 py-2">
                <p>{data?.message}</p>
            </div>
        </>
    )
}
