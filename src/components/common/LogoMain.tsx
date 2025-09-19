import logo from '@/assets/logos/logo_full_white_bg.jpeg'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

type LogoMainProps = {
    className?: string
    link?: string
}

export default function LogoMain({ className, link = '/' }: LogoMainProps) {
    return (
        <div className={cn('flex items-center', className)}>
            <Link to={link} className={cn('flex items-center justify-center rounded-full')}>
                <img src={logo} className="rounded-full" />
            </Link>
        </div>
    )
}
