import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import { deleteMeter } from '@/Utils/api'
import { useRouter } from 'next/router'

interface DeleteMeterButtonProps {
  meterId: string
}

const DeleteMeterButton = ({ meterId }: DeleteMeterButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const goHome = () => router.push('/')

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteMeter,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meters']
      })
      goHome()
    }
  })

  const handleDelete = () => mutate(meterId)

  return (
    <LoadingButton
      type='button'
      variant='contained'
      color='error'
      onClick={handleDelete}
      loading={isLoading}
    >
      Delete
    </LoadingButton>
  )
}

export default DeleteMeterButton
