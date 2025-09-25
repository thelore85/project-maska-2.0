import { useEffect, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import { useAzureLogin } from '@/features/auth/api/auth.hooks'

interface AuthGuardProps {
    children: ReactNode
    requireAuth?: boolean
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, isLoading } = useAuth()
    const { token } = useAuthStore()
    const { user } = useUserStore()
    const login = useAuthStore((state) => state.login)

    // Chiama callMe() solo se siamo autenticati in MSAL, abbiamo token ma non abbiamo ancora i dati utente
    const shouldCallMe = isAuthenticated && !!token && !user
    const { data: meData, isLoading: isLoadingMe, error: meError } = useAzureLogin(shouldCallMe)

    // Salva i dati quando arrivano dalla callMe() - solo se siamo ancora autenticati
    useEffect(() => {
        if (meData && !user && isAuthenticated) {
            login({
                user: meData.user,
                company: meData.company,
                docs: meData.docs || []
            })
        } else if (meData && !isAuthenticated) {
        }
    }, [meData, user, login, isAuthenticated])

    // Gestione errori della callMe() - logout se fallisce
    useEffect(() => {
        if (meError) {
            console.error('Errore nel recupero dati utente:', meError)
            // Potremmo fare logout automatico qui se necessario
        }
    }, [meError])

    // Redirect logic
    useEffect(() => {
        if (isLoading || isLoadingMe) return

        if (requireAuth) {
            // Route protetta
            if (!isAuthenticated) {
                navigate('/login', {
                    replace: true,
                    state: { from: location.pathname }
                })
            } else if (isAuthenticated && user) {
                // Autenticato con dati utente -> rimani sulla pagina protetta
                return
            } else if (isAuthenticated && !user && !isLoadingMe && !meError) {
                // Autenticato ma senza dati utente e non stiamo caricando
                return
            }
        } else {
            // Route pubblica (welcome, auth)
            if (isAuthenticated && user) {
                const from = location.state?.from || '/'
                navigate(from, { replace: true })
            }
        }
    }, [isAuthenticated, user, requireAuth, navigate, location, isLoading, isLoadingMe, meError, token])

    // Show loading mentre stiamo verificando l'auth o caricando i dati
    if (isLoading || (isAuthenticated && !user && isLoadingMe)) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-sm text-gray-600">Caricamento...</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
