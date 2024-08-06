import { Upload } from 'lucide-react'
import { useCSVReader } from 'react-papaparse'
import { Button } from '@/components/ui/button'
import { getRSCModuleInformation } from 'next/dist/build/analysis/get-page-static-info'

type Props = {
  onUpload: (result: any) => void
}

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader()

  //TODO: Add paywall

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size='sm' className='w-full lg:w-auto' {...getRootProps()}>
          <Upload className='mr-2 size-4' />
          Import
        </Button>
      )}
    </CSVReader>
  )
}
