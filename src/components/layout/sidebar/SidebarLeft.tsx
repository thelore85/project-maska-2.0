import LogoMain from '../../common/LogoMain'
import LogoutButton from '@/features/auth/components/LogoutButton'
import { useAuthStore } from '@/store/authStore'
import LoginButton from '@/features/auth/components/LoginButton'

type SidebarProps = {
    children?: React.ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
    const isAuthenticated = useAuthStore((store) => store.isAuthenticated)
    return (
        <aside className="flex w-64 flex-col bg-gray-300">
            {/* Header  */}
            <div className="flex min-h-[8vh] items-center border-b border-gray-200 bg-gray-300 px-4">
                <LogoMain />
            </div>
            {/* Sidebar Content  */}
            <div className="h-full overflow-auto p-4">{children}</div>
            {/* Sidebar Footer  */}
            <div className="mx-4 border-t-1 border-gray-100 py-4">{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
        </aside>
    )
}
