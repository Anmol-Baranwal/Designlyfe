import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const links = [
    { url: '/#home', label: 'Home' },
    { url: '/#mission', label: 'Mission' },
    { url: '/#how-it-works', label: 'How this works' },
    { url: '/#features', label: 'Features' },
  ]

  return (
    <div className="lg:px-24 md:px-8 px-4 py-6 bg-primary-100 text-bg-muted font-dm-sans tracking-wide">
      <div className="flex flex-wrap justify-center lg:justify-between md:items-center md:flex-col lg:flex-row">
        <p className="text-primary-300 md:mb-0 lg:mb-0 pb-2 pt-4 text-xl">
          Copyright &copy; {new Date().getFullYear()} Designlyfe
        </p>
        <div className="md:mt-4 lg:mt-0 flex flex-wrap justify-end py-4">
          {links.map((link, index) => (
            <Link
              href={link.url}
              key={index}
              scroll={false}
              className="ml-6 text-lg text-primary-300 hover:opacity-70 transition-all duration-500 hover:underline hover:text-accent-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
