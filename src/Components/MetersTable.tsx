'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getMeters } from '@/Utils/api'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel
} from '@mui/material'
import { Check, Clear } from '@mui/icons-material'
import Loader from './Loader'
import { Meter, SortDirection } from '@/Utils/types'
import { isBooleanProperty, showedMeterProperties, slugToTitle } from '@/Utils'
import AddMeterButton from './AddMeterButton'

const tableHeaderStyle = {
  cursor: 'pointer',
  overflowX: 'auto',
  whiteSpace: 'nowrap'
}

const tableRowStyle = {
  cursor: 'pointer',
  '&:nth-of-type(odd)': { background: '#303030' }
}

const MetersTable = () => {
  const router = useRouter()

  const redirectToMeter = (id: string) => {
    router.push(`/meters/${id}`)
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['meters'],
    queryFn: getMeters
  })

  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [sortColumn, setSortColumn] = useState(showedMeterProperties[0])

  const handleSort = (selectedColumn: string) => {
    if (selectedColumn === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortDirection('asc')
      setSortColumn(selectedColumn)
    }
  }

  const tableCellContent = (meter: Meter, property: string) => {
    const propertyValue = meter[property as keyof Meter]

    if (isBooleanProperty(property)) {
      return propertyValue ? <Check /> : <Clear />
    }

    return propertyValue
  }

  const renderSortIcon = (column: string) => {
    if (column === sortColumn) {
      return sortDirection === 'asc' ? (
        <TableSortLabel active direction='asc' />
      ) : (
        <TableSortLabel active direction='desc' />
      )
    }
    return null
  }

  const sortedMeters = data?.toSorted(
    (a: Record<string, string>, b: Record<string, string>) => {
      if (a[sortColumn] < b[sortColumn]) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (a[sortColumn] > b[sortColumn]) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    }
  )

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>Something went wrong... Try again later</div>}
      {sortedMeters && (
        <>
          <TableContainer component={Paper}>
            <Table aria-label='meters table'>
              <TableHead>
                <TableRow>
                  {showedMeterProperties.map((header) => (
                    <TableCell
                      key={header}
                      onClick={() => handleSort(header)}
                      sx={tableHeaderStyle}
                    >
                      {slugToTitle(header)}
                      {renderSortIcon(header)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedMeters.map((meter: Meter) => (
                  <TableRow
                    key={meter.id}
                    onClick={() => redirectToMeter(meter.id)}
                    sx={tableRowStyle}
                  >
                    {showedMeterProperties.map((property) => (
                      <TableCell key={property}>
                        {tableCellContent(meter, property)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AddMeterButton />
        </>
      )}
    </>
  )
}

export default MetersTable
