import SidebarLeft from '@/components/layout/sidebar/SidebarLeft'
import ArticlePreviewList from '@/features/articles/components/ArticlePreviewList'

type SidebarLayoutPorps = {
  children: React.ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutPorps) {
  return (
    <main className="flex h-screen">
      <SidebarLeft>
        <ArticlePreviewList />
      </SidebarLeft>
      <div className="flex flex-1 flex-col">{children}</div>
    </main>
  )
}
