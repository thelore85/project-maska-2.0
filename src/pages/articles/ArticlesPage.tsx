import SidebarLayout from '@/layouts/SidebarLayout'
// import { useInitApp } from '@/hooks/hooks'
import ArticleMain from '@/features/articles/components/ArticleMain'
import { useParams } from 'react-router-dom'
import { useGetDocumentById } from '@/features/documents/api/documents.hooks'
import { useEffect } from 'react'

export default function ArticlesPage() {
  // Hooks
  const { id } = useParams()
  const { data: document, isLoading, error } = useGetDocumentById(Number(id))

  useEffect(() => {
    if (document) {
      console.log('📄 Documento caricato:', document)
    }
  }, [document])

  return (
    <>
      <SidebarLayout>
        <ArticleMain />
      </SidebarLayout>
    </>
  )
}
