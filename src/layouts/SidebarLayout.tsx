import Button from '@/components/cta/Button'
import SidebarLeft from '@/components/layout/sidebar/SidebarLeft'
import { faFile, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type SidebarLayoutPorps = {
    children: React.ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutPorps) {
    return (
        <main className="flex h-screen">
            <SidebarLeft>
                {/* <ArticlePreviewList /> */}
                <Button variant="primary">
                    <FontAwesomeIcon icon={faPlusCircle} className="mr-4" />
                    <h1>New Company</h1>
                </Button>
                <Button variant="primary">
                    <FontAwesomeIcon icon={faFile} className="mr-4" />
                    <h1>Add document</h1>
                </Button>
            </SidebarLeft>
            <div className="flex flex-1 flex-col">{children}</div>
        </main>
    )
}
