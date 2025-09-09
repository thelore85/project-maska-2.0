import LogoMain from '../../common/LogoMain'
import { useStore } from '@/store/appStore'
import LogoutButton from '@/features/auth/components/LogoutButton'

type SidebarProps = {
  children?: React.ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  const selectCard = useStore((state) => state.selectCard)

  const handleResetCardSelection = () => {
    selectCard(null)
  }

  return (
    <aside className="flex w-64 flex-col bg-gray-300">
      {/* Header  */}
      <div className="flex min-h-[8vh] items-center bg-gray-300 px-4 shadow" onClick={handleResetCardSelection}>
        <LogoMain />
      </div>

      {/* Sidebar Actions  */}
      <div className="p-4">{/* <SearchInput placeholder="Search Scrapers" /> */}</div>

      {/* Sidebar Body  */}
      {children}
      {/* Sidebar Footer  */}
      <div className="mx-4 border-t-1 border-gray-100 py-4">
        <LogoutButton />
      </div>
    </aside>
  )
}
