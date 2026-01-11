import type { InputHTMLAttributes } from 'react'

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  label?: string
  direction?: 'horizontal' | 'vertical'
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Radio({ label, className = '', ...props }: RadioProps) {
  return (
    <label className={`radio ${className}`}>
      <input type="radio" className="radio__input" {...props} />
      <span className="radio__custom" />
      <span className="radio__label">{label}</span>
    </label>
  )
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  direction = 'vertical',
}: RadioGroupProps) {
  return (
    <div className="radio-group">
      {label && <span className="radio-group__label">{label}</span>}
      <div className={`radio-group__options radio-group__options--${direction}`}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
          />
        ))}
      </div>
    </div>
  )
}
