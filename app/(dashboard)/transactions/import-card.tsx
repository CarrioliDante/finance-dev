import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ImportTable } from './import-table'
import { convertAmountToMiliunits } from '@/lib/utils'
import { format, parse } from 'date-fns'

const dateFormat = 'yyyy-MM-dd HH:mm:ss'
const outputFormat = 'yyyy-MM-dd'

const requiredOptions = ['amount', 'date', 'payee']

interface SelectedColumnState {
  [key: string]: string | null
}

type Props = {
  data: string[][]
  onCancel: () => void
  onSubmit: (data: any) => void
}

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>(
    {}
  )
  const headers = data[0]
  const body = data.slice(1)

  const onTableHeadSelectedChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev }

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null
        }
      }
      if (value === 'skip') {
        value = null
      }

      newSelectedColumns[`column_${columnIndex}`] = value
      return newSelectedColumns
    })
  }

  const progress = Object.values(selectedColumns).filter(Boolean).length

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1]
    }
    //Transform the CSV Array[][] to our array of objects

    //Better mapping of our array
    //Ignore unwanted data, only pick what we need
    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`)
        return selectedColumns[`column_${columnIndex}`] || null
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`)
            return selectedColumns[`column_${columnIndex}`] ? cell : null
          })
          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow
        })
        .filter((row) => row.length > 0),
    }
    console.log({ mappedData })
    //Transform the selected data so our DB can accept it
    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index]
        if (header !== null) {
          acc[header] = cell
        }
        return acc
      }, {})
    })
    console.log({ arrayOfData })
    const formattedData = arrayOfData.map((item) => ({
      ...item,
      //Transform mount to miliniunits
      amount: convertAmountToMiliunits(parseFloat(item.amount)),
      //Transform date to our params of db
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }))
    console.log({ formattedData })

    onSubmit(formattedData)
  }
  //TODO: ADD MercadoPago and argentina banks csv format

  return (
    <div className='mx-auto -mt-24 w-full max-w-screen-2xl pb-10'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='line-clamp-1 text-xl'>
            Import transaction
          </CardTitle>
          <div className='flex flex-col items-center gap-x-2 gap-y-2 lg:flex-row'>
            <Button onClick={onCancel} size='sm' className='w-full lg:w-auto'>
              Cancel
            </Button>
            <Button
              className='w-full lg:w-auto'
              size='sm'
              disabled={progress < requiredOptions.length}
              onClick={handleContinue}
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectedChange={onTableHeadSelectedChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}
