import { z } from 'zod'
import { Trash, TrashIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DatePicker } from '@/components/date-picker'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { insertTransactionSchema } from '@/db/schema'
import { AmountInput } from '@/components/amount-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Select } from '@/components/select'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
})

const apiSchema = insertTransactionSchema.omit({ id: true })

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>
type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: ApiFormValues) => void
  onDelete?: () => void
  disabled?: boolean
  accountOptions: { label: string; value: string }[]
  categoryOptions: { label: string; value: string }[]
  onCreateAccount: (name: string) => void
  onCreateCategory: (name: string) => void
}

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })
  const handleSubmit = (values: FormValues) => {
    console.log({ values })
  }
  const handleDelete = () => {
    onDelete?.()
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-4 pt-4'
      >
        <FormField
          name='date'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              Account
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='accountId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Account
                <FormControl>
                  <Select
                    placeholder='Select an account'
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          name='categoryId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category
                <FormControl>
                  <Select
                    placeholder='Select an category'
                    options={categoryOptions}
                    onCreate={onCreateCategory}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          name='payee'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Payee
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder='Add a payee'
                    {...field}
                  />
                </FormControl>
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          name='amount'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Amount
                <FormControl>
                  <AmountInput
                    {...field}
                    placeholder='0.00'
                    disabled={disabled}
                  />
                </FormControl>
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          name='notes'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Notes
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder='Optional notes'
                  />
                </FormControl>
              </FormLabel>
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={disabled}>
          {id ? 'Save Changes' : 'Create account'}
        </Button>
        {!!id && (
          <Button
            type='button'
            disabled={disabled}
            onClick={handleDelete}
            className='w-full'
            variant='outline'
          >
            <Trash className='mr-2 size-4' />
            Delete Account
          </Button>
        )}
      </form>
    </Form>
  )
}
