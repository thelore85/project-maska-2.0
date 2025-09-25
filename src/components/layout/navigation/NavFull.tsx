import LogoMain from '@/components/common/LogoMain'
import LogoutButton from '@/features/auth/components/LogoutButton'

export default function NavFull() {
    return (
        <nav className="flex min-h-[8vh] items-center justify-between bg-white px-4 shadow">
            <LogoMain className="w-full max-w-[200px] rounded-4xl border-2 border-gray-200 bg-gray-100" />
            <div className="flex items-center space-x-4">
                <h1 className="text-xl font-medium tracking-tight text-gray-400">Green Impact Metrics</h1>
                <LogoutButton />
            </div>
        </nav>
    )
}
