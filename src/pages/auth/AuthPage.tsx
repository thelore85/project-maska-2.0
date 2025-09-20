import LoginCard from '@/features/auth/components/LoginCard'

import AuthLayout from '@/layouts/auth/AuthLayout'

export default function AuthPage() {
    return (
        <AuthLayout>
            <div className="flex h-full items-center justify-center">
                <div className="w-full">
                    <LoginCard />
                </div>
            </div>
        </AuthLayout>
    )
}
