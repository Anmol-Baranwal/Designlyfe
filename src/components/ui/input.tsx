import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isWarning?: boolean
  warningText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isWarning, warningText, ...props }, ref) => {
    return (
      <div className={cn('relative', className)}>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border',
            { 'border-warning': isWarning },
            'bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          )}
          ref={ref}
          {...props}
        />
        {isWarning && warningText && (
          <span className="text-xs mt-1">{warningText}</span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
