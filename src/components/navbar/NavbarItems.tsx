import React from 'react'
import NavbarMenuItems from './NavbarMenuItem'

const NavbarItems = () => {
  return (
    <div className="flex mr-auto">
      <NavbarMenuItems itemTxt="Explore" />
      <NavbarMenuItems itemTxt="Companies" />
      <NavbarMenuItems itemTxt="Why US" />
      <NavbarMenuItems itemTxt="Pricing" showIcon={true} />
      <NavbarMenuItems itemTxt="Categories" showIcon={true} />
    </div>
  )
}

export default NavbarItems
