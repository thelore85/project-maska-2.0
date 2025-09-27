import DocumentsSelector from '@/features/documents/components/DocumentsSelector'
import SidebarLayout from '@/layouts/SidebarLayout'

type Props = {}

export default function DocumentsPage({}: Props) {
    return (
        <div>
            <SidebarLayout title="Documents Selector">
                <DocumentsSelector />
            </SidebarLayout>
        </div>
    )
}
