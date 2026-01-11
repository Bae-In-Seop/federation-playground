import { InputHTMLAttributes } from 'react'

interface CheckboxOption {
  value: string
  label: string
}

interface CheckboxGroupProps {
  options: CheckboxOption[]
  values?: string[]
  onChange?: (values: string[]) => void
  label?: string
  direction?: 'horizontal' | 'vertical'
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`checkbox ${className}`}>
      <input type="checkbox" className="checkbox__input" {...props} />
      <span className="checkbox__custom">
        <svg viewBox="0 0 24 24" className="checkbox__check">
          <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="checkbox__label">{label}</span>
    </label>
  )
}

export function CheckboxGroup({
  options,
  values = [],
  onChange,
  label,
  direction = 'vertical',
}: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    const newValues = checked
      ? [...values, optionValue]
      : values.filter((v) => v !== optionValue)
    onChange?.(newValues)
  }

  return (
    <div className="checkbox-group">
      {label && <span className="checkbox-group__label">{label}</span>}
      <div className={`checkbox-group__options checkbox-group__options--${direction}`}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={values.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
          />
        ))}
      </div>
    </div>
  )
}
