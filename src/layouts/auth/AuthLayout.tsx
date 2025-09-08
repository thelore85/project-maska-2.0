import NavFull from '@/components/layout/navigation/NavFull'

type SidebarLayoutPorps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: SidebarLayoutPorps) {
  return (
    <main className="h-screen">
      <NavFull />
      <div className="flex flex-1 flex-col">{children}</div>
    </main>
  )
}
