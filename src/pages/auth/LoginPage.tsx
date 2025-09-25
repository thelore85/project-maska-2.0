import { useAuth } from '@/features/auth/hooks/useAuth'
import { cn } from '@/lib/utils'
import NavFull from '@/components/layout/navigation/NavFull'

export default function LoginPage() {
    const { login, isLoading } = useAuth()

    const handleLogin = async () => {
        try {
            await login(true) // usa popup para mejor UX
        } catch (error) {
            console.error('Error durante el login:', error)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Header con logo */}
            <NavFull />

            {/* Content */}
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Accede a la plataforma</h2>
                        <p className="text-gray-600">Inicia sesión para gestionar tus métricas de impacto ambiental</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={isLoading}
                                className={cn(
                                    'w-full rounded-lg px-4 py-3 font-medium transition-colors duration-200',
                                    'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400',
                                    'flex items-center justify-center'
                                )}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'Iniciar sesión con Azure'
                                )}
                            </button>

                            <div className="text-center">
                                <p className="text-xs text-gray-500">Al utilizar este servicio aceptas nuestros términos y condiciones de uso</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
