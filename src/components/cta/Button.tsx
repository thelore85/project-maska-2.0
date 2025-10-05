import type React from 'react'

type Props = {
  label?: string
  type?: 'submit'
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void)
  variant: 'primary' | 'secondary' | 'tertiary'
  children?: React.ReactNode
  disabled?: boolean
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function Button({ children, label, variant, onClick, type, disabled, className, size }: Props) {
  const baseStyle = 'flex items-center justify-center bg-primary mb-3 flex pointer w-full text-center rounded-2xl'

  const primary = variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-secondary'
  const secondary = variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-primary'
  const tertiary = variant === 'tertiary' && 'bg-background text-secondary-foreground hover:bg-primary'

  const sizeClasses = size === 'xs' ? 'px-2 py-1 text-xs' : size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2'

  return (
    <button
      onClick={onClick}
      type={type ? type : 'button'}
      className={`${baseStyle} ${sizeClasses} ${primary || secondary || tertiary} ${disabled && 'cursor-not-allowed opacity-50'} ${className}`}
      disabled={disabled}
    >
      {label ? label : children}
    </button>
  )
}
