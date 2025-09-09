import Button from '@/components/cta/Buttons'
import { useAuthStore } from '@/store/authStore'
import { msal } from '../utils/msalClient'

export default function LogoutButton() {
    const logoutStore = useAuthStore((store) => store.logout)

    const handleLogout = () => {
        logoutStore() // Pulisce lo store
        msal.logoutRedirect() // Logout da MSAL
    }

    return (
        <Button variant="secondary" onClick={handleLogout}>
            Logout
        </Button>
    )
}
