import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

export default function Card({
  title,
  description,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div className={`pg-card ${className}`} {...props}>
      {(title || description) && (
        <div className="pg-card__header">
          {title && <h3 className="pg-card__title">{title}</h3>}
          {description && <p className="pg-card__description">{description}</p>}
        </div>
      )}
      <div className="pg-card__content">{children}</div>
    </div>
  )
}
