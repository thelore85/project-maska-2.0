import SidebarLeft from '@/components/layout/sidebar/SidebarLeft'
import ComanyMenuButton from '@/features/company/components/ComanyMenuButton'
import DocumentsMenuButton from '@/features/documents/components/DocumentsMenuButton'
import NavMain from '@/components/layout/navigation/NavMain'
import { Link } from 'react-router-dom'

type SidebarLayoutPorps = {
    children: React.ReactNode
    title?: string
}

export default function SidebarLayout({ children, title }: SidebarLayoutPorps) {
    return (
        <main className="flex h-screen">
            <SidebarLeft>
                <div className="mb-21 border-b border-gray-200">
                    <Link className="text-primary hover:text-secondary block p-3 font-bold" to="/">
                        Admin
                    </Link>
                    <Link className="text-primary hover:text-secondary block p-3 font-bold" to="/documents">
                        Documents
                    </Link>
                    <span className="text-primary block cursor-not-allowed p-3 font-bold opacity-50 select-none">Company</span>
                    <span className="text-primary block cursor-not-allowed p-3 font-bold opacity-50 select-none">Evidence</span>
                    <span className="text-primary block cursor-not-allowed p-3 font-bold opacity-50 select-none">URL</span>
                    <span className="text-primary block cursor-not-allowed p-3 font-bold opacity-50 select-none">Dashboard</span>
                </div>
                <div>
                    <ComanyMenuButton />
                    <DocumentsMenuButton />
                </div>
            </SidebarLeft>
            <div className="flex flex-1 flex-col">
                <NavMain />
                <div className="overflow-y-auto p-6">
                    <div className="mx-auto">
                        {title && <h1 className="mb-6 text-2xl font-bold">{title}</h1>}
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}
