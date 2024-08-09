import React from 'react'
import HeaderLogo from './headerlogo'
import Navigation from './navigation'
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import WelcomeMsg from './welcome-msg'
import { Filters } from './filters'

const Header = () => {
  return (
    <header className='bg-gradient-to-b from-blue-600 to-blue-500 px-4 py-8 pb-36 lg:px-14'>
      <div className='mx-auto max-w-screen-2xl'>
        <div className='mb-14 flex w-full items-center justify-between'>
          <div className='flex items-center lg:gap-x-16'>
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl='/' />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='size.8 animate-spin text-slate-400' />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  )
}

export default Header
