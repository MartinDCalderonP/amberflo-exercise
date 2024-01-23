import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import { deleteMeter } from '@/Utils/api'
import { useRouter } from 'next/router'
import ErrorModal from '../Modals/ErrorModal'

interface DeleteMeterButtonProps {
  meterId: string
}

const DeleteMeterButton = ({ meterId }: DeleteMeterButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const goHome = () => router.push('/')

  const queryClient = useQueryClient()

  const handleError = (error: string) => {
    setIsLoading(false)
    setErrorMessage(error || 'Something went wrong, please try again later')
    setShowErrorModal(true)
  }

  const { mutate } = useMutation({
    mutationFn: deleteMeter,
    onMutate: () => setIsLoading(true),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['meters']
      })
      if (res.error) {
        handleError(res.error)
      }
      if (res.data) {
        setIsLoading(false)
        goHome()
      }
    },
    onError: (error: Error) => {
      handleError(error.message)
    }
  })

  const handleDelete = () => mutate(meterId)

  return (
    <>
      <LoadingButton
        type='button'
        variant='contained'
        color='error'
        onClick={handleDelete}
        loading={isLoading}
      >
        Delete
      </LoadingButton>
      <ErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default DeleteMeterButton
