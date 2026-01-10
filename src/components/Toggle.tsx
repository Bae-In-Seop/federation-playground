import { forwardRef, type InputHTMLAttributes } from 'react'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <label className={`pg-toggle ${className}`} htmlFor={toggleId}>
        <input ref={ref} type="checkbox" id={toggleId} className="pg-toggle__input" {...props} />
        <span className="pg-toggle__slider" />
        {label && <span className="pg-toggle__label">{label}</span>}
      </label>
    )
  }
)

Toggle.displayName = 'Toggle'

export default Toggle
