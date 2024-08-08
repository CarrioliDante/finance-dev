import {
  FileSearch,
  Loader2,
  PieChart,
  Radar,
  Radio,
  Target,
} from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from './ui/select'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card'

import { useState } from 'react'

import { PieVariant } from './pie-variant'
import { RadarVariant } from './radar-variant'
import { RadialVariant } from './radial-variant'
import { Skeleton } from './ui/skeleton'

type Props = {
  data?: {
    name: string
    value: number
  }[]
}

export const SpendingPie = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState('pie')

  const onTypeChange = (type: string) => {
    //TODO: add paywall
    setChartType(type)
  }
  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0'>
        <CardTitle className='line-clamp-1 text-xl'>Categories</CardTitle>
        {/*to do: Add select */}
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className='h-9 rounded-md px-3 lg:w-auto'>
            <SelectValue placeholder='Chart type' />
            <SelectContent>
              <SelectItem value='pie'>
                <div className='flex items-center'>
                  <PieChart className='mr-2 size-4 shrink-0' />
                  <p className='line-clamp-1'>Pie chart</p>
                </div>
              </SelectItem>
              {/* <SelectItem value='line'>
                <div className='flex items-center'>
                  <Radar className='mr-2 size-4 shrink-0' />
                  <p className='line-clamp-1'>Radar chart</p>
                </div>
              </SelectItem> */}
              <SelectItem value='radial'>
                <div className='flex items-center'>
                  <Target className='mr-2 size-4 shrink-0' />
                  <p className='line-clamp-1'>Radial chart</p>
                </div>
              </SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </CardHeader>
      <CardContent className=''>
        {data.length === 0 ? (
          <div className='flex h-[350px] flex-col items-center justify-center gap-y-4'>
            <FileSearch className='size-6 text-muted-foreground' />
            <p className='text-sm text-muted-foreground'>
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === 'pie' && <PieVariant data={data} />}
            {/* {chartType === 'radar' && <RadarVariant data={data} />} */}
            {chartType === 'radial' && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export const PieLoading = () => {
  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-8 w-full lg:w-[120px]' />
      </CardHeader>
      <CardContent>
        <div className='flex h-[350px] w-full items-center justify-center'>
          <Loader2 className='h6 w-6 animate-spin text-slate-300' />
        </div>
      </CardContent>
    </Card>
  )
}
