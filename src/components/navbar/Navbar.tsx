import React, { FC } from 'react'
import Logo from '../Logo'
import Button from '../Button'
import NavbarItems from './NavbarItems'

const Navbar: FC = () => {
  return (
    <div className="flex align-items items-center justify-between px-6 mt-0 p-4 border-b-2 shadow-md bg-primary-300">
      <Logo className="text-xl font-semibold mr-28 text-primary-100" />
      <NavbarItems />
      <div className="flex justify-end">
        <Button
          linkHref={'/login'}
          buttonTxt={'Login'}
          className={
            'border-2 border-primary-100 bg-accent-200 text-bg-300 hover:bg-primary-100 hover:text-primary-300 transition duration-300'
          }
        />
        <Button
          linkHref={'/signup'}
          buttonTxt={'Signup'}
          className={
            'bg-primary-100 text-text-100 hover:bg-primary-300 hover:text-bg-300 border-2 border-violet-500 transition duration-300'
          }
        />
      </div>
    </div>
  )
}

export default Navbar