import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface ButtonProps {
  buttonTxt: string
  showIcon?: boolean
  className: string
}

const Button: FC<ButtonProps> = ({
  buttonTxt,
  showIcon = false,
  className,
}) => {
  return (
    <>
      <button
        className={`py-2 px-8 mx-2 border border-light-primary shadow-md ${className}`}
      >
        {buttonTxt}
        {showIcon && (
          <FontAwesomeIcon
            icon={faChevronDown}
            className="w-5 h-5 ml-2 inline-block"
          />
        )}
      </button>
    </>
  )
}

export default Button
