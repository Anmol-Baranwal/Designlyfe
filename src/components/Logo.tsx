import React, { FC } from 'react'
// import Image from 'next/image'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className="flex">
      {/* <Image
        src="/next.svg"
        alt="Brand Logo"
        className="w-12 h-12"
        width={12}
        height={12}
      /> */}
      <span className={`font-semibold ${className} ml-4 `}>Designlyfe</span>
    </div>
  )
}

export default Logo
