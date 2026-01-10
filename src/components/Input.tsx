import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={`pg-input-wrapper ${error ? 'pg-input-wrapper--error' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="pg-input__label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`pg-input ${className}`}
          {...props}
        />
        {error && <span className="pg-input__error">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
