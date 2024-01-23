'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getMeters } from '@/Utils/api'
import {
  ButtonBase,
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
import AddMeterButton from './Buttons/AddMeterButton'

const tableHeaderStyle = {
  cursor: 'pointer',
  overflowX: 'auto',
  whiteSpace: 'nowrap'
}

const tableRowStyle = {
  display: 'table-row',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:nth-of-type(odd)': { background: '#303030' },
  '&:hover': { background: '#404040', scale: '1.01' },
  '&:active': { background: '#505050', scale: '0.9' }
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

  const handleRowClick = (id: string) => {
    redirectToMeter(id)
  }

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
                      {header === sortColumn && (
                        <TableSortLabel active direction={sortDirection} />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedMeters.map((meter: Meter) => (
                  <ButtonBase
                    key={meter.id}
                    component={TableRow}
                    onClick={() => handleRowClick(meter.id)}
                    sx={tableRowStyle}
                  >
                    {showedMeterProperties.map((property) => (
                      <TableCell key={property}>
                        {tableCellContent(meter, property)}
                      </TableCell>
                    ))}
                  </ButtonBase>
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
