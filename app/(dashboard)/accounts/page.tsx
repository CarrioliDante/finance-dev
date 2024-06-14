'use client'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
const AccountsPage = () => {
  const newAccount = useNewAccount()
  return (
    <div className='mx-auto -mt-24 w-full max-w-screen-2xl pb-10'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='line-clamp-1 text-xl'>Accounts page</CardTitle>
          <Button onClick={newAccount.onOpen} size='sm'>
            <Plus className='mr-2 size-4' />
            Add New
          </Button>
        </CardHeader>
      </Card>
    </div>
  )
}

export default AccountsPage
