import { useAuthStore } from '@/store/authStore'
import { msal } from '../utils/msalClient'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LogoutButton() {
    const logoutStore = useAuthStore((store) => store.logout)
    const isAuthenticated = useAuthStore((store) => store.isAuthenticated)

    const handleLogout = () => {
        logoutStore() // Pulisce lo store
        msal.logoutRedirect() // Logout da MSAL
    }

    if (!isAuthenticated) return null

    return (
        <button
            onClick={handleLogout}
            className="flex w-full max-w-[450px] cursor-pointer items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-center text-sm text-white transition-colors hover:bg-gray-800 hover:bg-white hover:text-gray-900"
        >
            Logout
            <FontAwesomeIcon icon={faSignOut} className="ml-4" />
        </button>
    )
}
