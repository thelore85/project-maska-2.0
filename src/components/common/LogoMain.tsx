import logo from '@/assets/logos/logo_full_white_bg.jpeg'
import { cn } from '@/lib/utils'

type LogoMainProps = {
  className?: string
}

export default function LogoMain({ className }: LogoMainProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <div className={cn('flex items-center justify-center rounded-full')}>
        <img src={logo} className="rounded-full" />
      </div>
    </div>
  )
}
