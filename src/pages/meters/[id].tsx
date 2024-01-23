import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getMeters } from '@/Utils/api'
import Loader from '@/Components/Loader'
import { Meter } from '@/Utils/types'
import MeterForm from '@/Components/MeterForm'
import { ArrowBack } from '@mui/icons-material'
import { Button, Container, Toolbar } from '@mui/material'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '75%',
  padding: '2rem',

  '& form': {
    padding: '1rem',

    '& > *': {
      width: '100%',
      maxWidth: '100%',
      justifyContent: 'space-between',
      gap: '1rem',
      marginLeft: '0'
    },

    '& > button': {
      alignSelf: 'flex-end',
      width: '100px'
    }
  }
}

const MeterDetail = () => {
  const router = useRouter()

  const goBack = () => router.back()

  const { id } = router.query

  const { data, isLoading, error } = useQuery({
    queryKey: ['meters'],
    queryFn: getMeters
  })

  const meter = data?.find((meter: Meter) => meter.id === id)

  return (
    <Container sx={containerStyle}>
      <Toolbar>
        <Button variant='outlined' onClick={goBack} color='primary'>
          <ArrowBack />
        </Button>
      </Toolbar>
      {isLoading && <Loader />}
      {error && <p>Something went wrong, please try again later</p>}
      {meter && <MeterForm meter={meter} />}
    </Container>
  )
}

export default MeterDetail
