import { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export function IconButton({
  icon,
  variant = 'primary',
  size = 'md',
  label,
  className = '',
  ...props
}: IconButtonProps) {
  const classes = [
    'icon-button',
    `icon-button--${variant}`,
    `icon-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} aria-label={label} {...props}>
      <span className="icon-button__icon">{icon}</span>
      {label && <span className="icon-button__label">{label}</span>}
    </button>
  )
}
