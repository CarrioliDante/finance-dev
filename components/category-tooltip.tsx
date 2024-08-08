import { format } from 'date-fns'
import { formatCurrency } from '@/lib/utils'
import { Separator } from './ui/separator'

export const CategoryToolTip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null

  const name = payload[0].payload.name
  const value = payload[0].value

  return (
    <div className='overflow-hidden rounded-sm border bg-white shadow-sm'>
      <div className='bg-muted p-2 px-3 text-sm text-muted-foreground'>
        {name}
      </div>
      <Separator />
      <div className='space-y-1 p-2 px-3'>
        <div className='flex items-center justify-between gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <div className='size-1.5 rounded-full bg-rose-500' />
            <p className='text-sm text-muted-foreground'>Expenses</p>
          </div>
          <p>{formatCurrency(value * -1)}</p>
        </div>
      </div>
    </div>
  )
}
