import Link from 'next/link'
import React, { FC } from 'react'

interface BriefTitleProps {
  size: string
  className?: string
  txt: string
  href?: string
}

export const BriefTitle: FC<BriefTitleProps> = ({
  size,
  className,
  txt,
  href,
}) => {
  return (
    <div className={`mt-20 relative w-full`}>
      <h3
        className={`text-lg md:text-xl font-dm-sans tracking-wide mb-[-12px] ml-2 ${className}`}
      >
        {href ? <Link href={href}>{txt}</Link> : txt}
      </h3>
      <div className={`${size} bg-slate-200 rounded-lg ml-0`} />
    </div>
  )
}

export default BriefTitle
