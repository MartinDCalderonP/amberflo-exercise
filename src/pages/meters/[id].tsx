import { useRouter } from 'next/router'

const MeterDetail = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Meter Detail</h1>
      <p>ID: {id}</p>
    </div>
  )
}

export default MeterDetail
