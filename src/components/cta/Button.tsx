import type React from 'react'

type Props = {
  label?: string
  type?: 'submit'
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void)
  variant: 'primary' | 'secondary' | 'tertiary'
  children?: React.ReactNode
  disabled?: boolean
  className?: string
}

export default function Button({ children, label, variant, onClick, type, disabled, className }: Props) {
  const baseStyle = 'flex items-center justify-center bg-primary mb-3 flex pointer w-full text-center rounded-2xl px-4 py-2'

  const primary = variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-secondary'
  const secondary = variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-primary'
  const tertiary = variant === 'tertiary' && 'bg-background text-secondary-foreground hover:bg-primary'

  return (
    <button
      onClick={onClick}
      type={type ? type : 'button'}
      className={`${baseStyle} ${primary || secondary || tertiary} ${disabled && 'cursor-not-allowed opacity-50'} ${className}`}
      disabled={disabled}
    >
      {label ? label : children}
    </button>
  )
}
