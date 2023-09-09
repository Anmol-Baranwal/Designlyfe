import React, { FC } from 'react'

interface BriefTitleProps {
  size: string
  className?: string
  txt: string
}

export const BriefTitle: FC<BriefTitleProps> = ({ size, className, txt }) => {
  return (
    <div className={`mt-20 relative w-full ${className}`}>
      <h3
        className={`text-xl font-dm-sans tracking-wide mb-[-12px] ml-2 hover:tracking-wider transition-all duration-300 cursor-pointer hover:text-slate-600`}
      >
        {txt}
      </h3>
      <div className={`${size} bg-slate-200 rounded-lg`} />
    </div>
  )
}

export default BriefTitle
