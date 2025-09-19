import SidebarLeft from '@/components/layout/sidebar/SidebarLeft'
import ComanyMenuButton from '@/features/company/components/ComanyMenuButton'
import DocumentsMenuButton from '@/features/documents/components/DocumentsMenuButton'

type SidebarLayoutPorps = {
    children: React.ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutPorps) {
    return (
        <main className="flex h-screen">
            <SidebarLeft>
                {/* <ArticlePreviewList /> */}
                <ComanyMenuButton />
                <DocumentsMenuButton />
            </SidebarLeft>
            <div className="flex flex-1 flex-col">{children}</div>
        </main>
    )
}
