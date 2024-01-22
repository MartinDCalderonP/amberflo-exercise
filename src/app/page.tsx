import { Typography, Container } from '@mui/material'
import MetersTable from '@/Components/MetersTable'

const HomePage = () => {
  return (
    <Container>
      <Typography
        variant='h1'
        align='center'
        fontSize={40}
        gutterBottom
        sx={{
          marginTop: '2rem'
        }}
      >
        Amberflo Exercise
      </Typography>
      <MetersTable />
    </Container>
  )
}

export default HomePage
