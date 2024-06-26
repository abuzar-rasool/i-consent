'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { notFound, redirect } from 'next/navigation'

const HomePage = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!session) redirect('/api/auth/signin') // Redirect if not authenticated
  }, [session, status])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status == 'authenticated') {
    redirect('/consent-forms')
  }

  if (status == 'unauthenticated') {
    redirect('/api/auth/signin')
  }

  return notFound();

}

export default HomePage
