'use client'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { Payment, columns } from './columns'
import { DataTable } from '@/components/data-table'

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52f',
    amount: 500,
    status: 'success',
    email: 'am@example.com',
  },
  // ...
]

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
        <CardContent>
          <DataTable
            filterKey='email'
            columns={columns}
            data={data}
            onDelete={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountsPage
