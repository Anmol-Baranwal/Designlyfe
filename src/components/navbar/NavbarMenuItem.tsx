import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface NavbarMenuItemsProps {
  itemTxt: string
  showIcon?: boolean
}

const NavbarMenuItems: FC<NavbarMenuItemsProps> = ({
  itemTxt,
  showIcon = false,
}) => {
  return (
    <>
      <div className="mx-1 text-md py-2 px-4 font-semibold text-bg-200 hover:bg-primary-100 hover:shadow-md hover:rounded-sm transition duration-300 hover:text-primary-300">
        {itemTxt}{' '}
        {showIcon && (
          <FontAwesomeIcon
            icon={faChevronDown}
            className="w-3 h-3 pb-[2px] ml-0 inline-block"
          />
        )}
      </div>
    </>
  )
}

export default NavbarMenuItems
