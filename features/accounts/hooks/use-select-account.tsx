import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useGetAccounts } from '../api/use-get-accounts'
import { useCreateAccount } from '../api/use-create-account'
import { Select } from '@/components/select'

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>,
] => {
  const accountQuery = useGetAccounts()
  const accountMutation = useCreateAccount()
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    })
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }))

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void
  } | null>(null)

  //useref to save values
  const selectValue = useRef<string>()

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve })
    })

  const handleClose = () => {
    setPromise(null)
  }
  const handleConfirm = () => {
    promise?.resolve(selectValue.current)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(undefined)
    handleClose()
  }
  const ConfirmDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Select Account
            <DialogDescription>
              Please select an account to continue
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <Select
          placeholder='Select an account'
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => (selectValue.current = value)}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className='pt-2'>
          <Button onClick={handleCancel} variant='outline'>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfirmDialog, confirm]
}
