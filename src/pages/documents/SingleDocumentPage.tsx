import SidebarLayout from '@/layouts/SidebarLayout'
// import { useInitApp } from '@/hooks/hooks'
import DocumetDetails from '@/features/articles/components/DocumetDetails'
import { useParams } from 'react-router-dom'
import { useGetDocumentById } from '@/features/documents/api/documents.hooks'
import { useEffect } from 'react'

export default function SingleDocumentPage() {
  // Hooks
  const { id } = useParams()
  const { data: document, error } = useGetDocumentById(Number(id))

  useEffect(() => {
    if (document) {
      console.log('📄 Documento caricato:', document)
    }

    if (error) {
      throw new Error('Error getting document by id')
    }
  }, [document, error])

  return (
    <>
      <SidebarLayout>
        <DocumetDetails document={document} />
      </SidebarLayout>
    </>
  )
}
