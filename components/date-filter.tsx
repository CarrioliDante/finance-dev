'use client'

import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetSummary } from '@/features/summary/api/use-get-summray'
import { useState } from 'react'
import { format, subDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { ChevronDown } from 'lucide-react'
import { cn, formatDateRange } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from './ui/popover'

export const DateFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const accountId = params.get('accountId')
  const from = params.get('from') || ''
  const to = params.get('to') || ''
  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  }

  const [date, setDate] = useState<DateRange | undefined>(paramState)

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: format(dateRange?.from || defaultFrom, 'yyyy-MM-ddd'),
      to: format(dateRange?.to || defaultTo, 'yyyy-MM-ddd'),
      accountId: accountId,
    }
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    )
    router.push(url)
  }
  const onReset = () => {
    setDate(undefined)
    pushToUrl(undefined)
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          disabled={false}
          size='sm'
          variant='outline'
          className='h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto'
        >
          <span>{formatDateRange(paramState)} </span>
          <ChevronDown className='ml-2 size-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 lg:w-auto' align='start'>
        <Calendar
          disabled={false}
          initialFocus
          mode='range'
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className='flex w-full items-center gap-x-2 p-2'>
          <PopoverClose asChild>
            <Button
              onClick={onReset}
              disabled={!date?.from || !date?.to}
              className='w-full'
              variant='outline'
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              onClick={() => pushToUrl(date)}
              disabled={!date?.from || !date?.to}
              className='w-full'
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
