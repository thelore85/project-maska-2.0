import SidebarLayout from '@/layouts/SidebarLayout'
// import { useInitApp } from '@/hooks/hooks'
import ArticleMain from '@/features/articles/components/ArticleMain'
import { useParams } from 'react-router-dom'

export default function ArticlesPage() {
  // Hooks
  const { id } = useParams()

  return (
    <>
      <SidebarLayout>
        <ArticleMain />
      </SidebarLayout>
    </>
  )
}
