import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMeter } from '@/Utils/api'

interface DeleteMeterButtonProps {
  meterId: string
}

const DeleteMeterButton = ({ meterId }: DeleteMeterButtonProps) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteMeter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meters']
      })
    }
  })

  const handleDelete = () => mutate(meterId)

  return (
    <Button
      type='button'
      variant='contained'
      color='error'
      onClick={handleDelete}
    >
      Delete
    </Button>
  )
}

export default DeleteMeterButton
