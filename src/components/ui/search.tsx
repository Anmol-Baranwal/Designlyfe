import { Input, InputProps } from './input'

interface SearchProps extends InputProps {
  className: string
  value?: string
  // onChange?: ReactNode
}

export function Search({ className, value, onChange, ...rest }: SearchProps) {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className={`${className}`}
        {...rest}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
