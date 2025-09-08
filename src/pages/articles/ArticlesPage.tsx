import BackupCard from '@/components/cards/HeroCard'
import FooterApp from '@/components/layout/footer/FooterApp'
import NavMain from '@/components/layout/navigation/NavMain'
import Loader from '@/components/common/Loader'
import SidebarLayout from '@/layouts/SidebarLayout'
// import { useInitApp } from '@/hooks/hooks'
import ArticleMain from '@/features/articles/components/ArticleMain'
import { useStore } from '@/store/appStore'

export default function ArticlesPage() {
  // const init = useInitApp()
  const init = useStore((store) => store.init)
  if (!init) return <Loader />

  if (init) {
    return (
      <>
        <SidebarLayout>
          <NavMain />
          <ArticleMain />
          <BackupCard />
          <FooterApp />
        </SidebarLayout>
      </>
    )
  }
}
