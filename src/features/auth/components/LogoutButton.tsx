import Button from '@/components/cta/Button'
import { useAuthStore } from '@/store/authStore'
import { msal } from '../utils/msalClient'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LogoutButton() {
    const logoutStore = useAuthStore((store) => store.logout)

    const handleLogout = () => {
        logoutStore() // Pulisce lo store
        msal.logoutRedirect() // Logout da MSAL
    }

    return (
        <Button variant="secondary" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} className="mr-4" />
            Logout
        </Button>
    )
}
