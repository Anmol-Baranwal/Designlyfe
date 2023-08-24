import * as React from 'react'

import { cn } from '@/lib/utils'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import { useState } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isWarning?: boolean
  warningText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isWarning, warningText, ...props }, ref) => {
    // const [showPassword, setShowPassword] = useState<boolean>(false)

    // const togglePasswordVisibility = () => {
    //   setShowPassword((prevState) => !prevState)
    // }

    return (
      <div className={cn('relative', className)}>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border',
            { 'focus-visible:ring-2': isWarning },
            `bg-background px-3 py-2 text-sm ${
              isWarning
                ? 'focus:ring-destructive'
                : 'focus-visible:ring-2 focus:ring-ring'
            } ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`
          )}
          ref={ref}
          {...props}
        />
        {/* {type === 'password' && (
          <span
            className="w-4 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        )} */}
        {isWarning && warningText && (
          <span className="text-xs mt-1">{warningText}</span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
