import { Logo } from '@/components/icons'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
      <Link
        className="flex items-center gap-2 font-semibold h-full flex-col justify-center"
        href="/"
      >
        <Logo />
        <span className="">iConsent</span>
      </Link>
  )
}

export default HomePage