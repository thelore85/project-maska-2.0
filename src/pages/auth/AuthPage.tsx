import LoginCover from '@/features/auth/components/LoginCover'

import AuthLayout from '@/layouts/auth/AuthLayout'

export default function AuthPage() {
  return (
    <AuthLayout>
      <div className="flex h-full items-center justify-center">
        <div className="w-full">
          <LoginCover />
        </div>
      </div>
    </AuthLayout>
  )
}
