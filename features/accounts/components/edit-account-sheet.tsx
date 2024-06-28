import { z } from 'zod'

import { useOpenAccount } from '../hooks/use-open-account'
import { AccountForm } from '@/features/accounts/components/account-form'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useEditAccount } from '@/features/accounts/api/use-edit-account'
import { Loader2 } from 'lucide-react'

import { insertAccountSchema } from '@/db/schema'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount()

  const accountQuery = useGetAccount(id)
  const editMutation = useEditAccount(id)

  const isPending = editMutation.isPending

  const isLoading = accountQuery.isLoading

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: '',
      }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>
            Edit or delete an existing account.
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className='animate-sping size-4 text-muted-foreground' />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}