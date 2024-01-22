import { Typography, Container } from '@mui/material'

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
    </Container>
  )
}

export default HomePage
