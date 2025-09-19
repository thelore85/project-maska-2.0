import Button from '@/components/cta/Button'
import { useAuth } from '../hooks/useAuth'

export default function LoginButton() {
    const { login, isLoading } = useAuth()

    const handleLogin = async (usePopup: boolean = false) => {
        try {
            await login(usePopup)
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-x-2">
                <Button variant="secondary" onClick={() => handleLogin(true)} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                </Button>
            </div>
        </div>
    )
}
