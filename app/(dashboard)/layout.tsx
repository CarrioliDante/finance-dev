type Props = {
    children: React.ReactNode
}

import Header from '@/components/header'
import React from 'react'

const DashboardLayout = ({children}: Props) => {
  return (
    <>
    <Header/>
        <main className='px-3 lg:px-14'>
            {children}
        </main>
    </>
  )
}

export default DashboardLayout