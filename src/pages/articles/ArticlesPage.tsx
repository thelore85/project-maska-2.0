import SidebarLayout from '@/layouts/SidebarLayout'
// import { useInitApp } from '@/hooks/hooks'
import ArticleMain from '@/features/articles/components/ArticleMain'

export default function ArticlesPage() {
  return (
    <>
      <SidebarLayout>
        <ArticleMain />
      </SidebarLayout>
    </>
  )
}
