import { cn, formatCurrency, formatPercentage } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { IconType } from 'react-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { CountUp } from './count-up'
import { Skeleton } from './ui/skeleton'

const boxVariant = cva('shrink-0 round-md p-3', {
  variants: {
    variant: {
      default: 'bg-blue-500/20',
      success: 'bg-emerald-500/20',
      danger: 'bg-rose-500/20',
      warning: 'bg-yellow-500/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const iconVariant = cva('size-6', {
  variants: {
    variant: {
      default: 'fill-blue-500',
      success: 'fill-emerald-500',
      danger: 'fill-rose-500',
      warning: 'fill-yellow-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type BoxVariants = VariantProps<typeof boxVariant>
type IconVariants = VariantProps<typeof iconVariant>
//Variant prop, we can extract it even when no typed bcs is extended from boxVariant and iconVariant
interface DataCardProps extends BoxVariants, IconVariants {
  icon: IconType
  title: string
  value?: number
  dateRange: string
  percentageChange?: number
}

export const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  variant,
  dateRange,
  percentageChange = 0,
}: DataCardProps) => {
  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
        <div className='space-y-2'>
          <CardTitle className='line-clamp-1 text-2xl'>{title}</CardTitle>
          <CardDescription className='line-clamp-1'>
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn({ variant })}></div>
        <Icon className={cn(iconVariant({ variant }))} />
      </CardHeader>
      <CardContent>
        <h1 className='mb-2 line-clamp-1 break-all text-2xl font-bold'>
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p
          className={cn(
            'line-clamp-1 text-sm text-muted-foreground',
            percentageChange > 0 && 'text-emerald-500',
            percentageChange < 0 && 'text-rose-500'
          )}
        >
          {formatPercentage(percentageChange)} from last period.
        </p>
      </CardContent>
    </Card>
  )
}

export const DataCardLoading = () => {
  return (
    <Card className='h-[192px] border-none drop-shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-24' />
          <Skeleton className='h-4 w-40' />
        </div>
        <Skeleton className='size-12' />
      </CardHeader>
      <CardContent>
        <Skeleton className='mb-2 h-10 w-24 shrink-0' />
        <Skeleton className='h-4 w-40 shrink-0' />
      </CardContent>
    </Card>
  )
}
