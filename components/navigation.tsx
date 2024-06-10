'use client'
import { useMedia } from 'react-use'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import NavButton from './navbutton'
import { Button } from './ui/button'
import { Key, Menu } from 'lucide-react'

const routes = [
 {
  href: '/',
  label: 'Overview',
 },
 {
  href: '/transactions',
  label: 'Transactions',
 },
 {
  href: '/accounts',
  label: 'Accounts',
 },
 {
  href: '/categories',
  label: 'Categories',
 },
 {
  href: '/settings',
  label: 'Settings',
 },
]

const Navigation = () => {
 const [isOpen, setIsOpen] = useState(false)
 const router = useRouter()
 const pathname = usePathname()
 const isMobile = useMedia('(max-width: 1024px', false)

 const onClick = (href: string) => {
  router.push(href)
  setIsOpen(false)
 }
 if (isMobile) {
  return (
   <Sheet open={isOpen} onOpenChange={setIsOpen}>
    <SheetTrigger>
     <Button
      variant='outline'
      size='sm'
      className='focub:bg-white/30 border-none bg-white/10 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus-visible:ring-transparent focus-visible:ring-offset-0'
     >
      <Menu className='size-4' />
     </Button>
    </SheetTrigger>
    <SheetContent side='left' className='px-2'>
     <nav className='flex flex-col gap-y-2 pt-6'>
      {routes.map((route) => (
       <Button
        key={route.href}
        variant={route.href === pathname ? 'secondary' : 'ghost'}
        onClick={() => onClick(route.href)}
        className='w-full justify-start'
       >
        {route.label}
       </Button>
      ))}
     </nav>
    </SheetContent>
   </Sheet>
  )
 }

 return (
  <nav className='hidden items-center gap-x-2 overflow-auto lg:flex'>
   {routes.map((route) => (
    <NavButton
     key={route.href}
     href={route.href}
     label={route.label}
     isActive={pathname === route.href}
    />
   ))}
  </nav>
 )
}

export default Navigation
