import {
  Tooltip,
  XAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts'
import { format } from 'date-fns'
import { CustomToolTip } from './tooltip'

type Props = {
  data: {
    date: string
    income: number
    expenses: number
  }[]
}

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey='date'
          tickFormatter={(value) => format(value, 'dd MMM')}
          style={{ fontSize: '12px' }}
          tickMargin={16}
        />
        <Tooltip content={<CustomToolTip />} />
        <Line
          dataKey='income'
          stroke='#3b82f6'
          strokeWidth={2}
          className='drop-shadow-sm'
        ></Line>
        <Line
          dot={false}
          dataKey='expenses'
          stroke='#f43f5e'
          strokeWidth={2}
          className='drop-shado w-sm'
        ></Line>
      </LineChart>
    </ResponsiveContainer>
  )
}
