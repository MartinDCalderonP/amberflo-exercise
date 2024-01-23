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

  const { mutate } = useMutation({
    mutationFn: deleteMeter,
    onMutate: () => setIsLoading(true),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['meters']
      })
      if (res.error) {
        setIsLoading(false)
        setErrorMessage(res.error)
        setShowErrorModal(true)
      }
      if (res.data) {
        setIsLoading(false)
        goHome()
      }
    },
    onError: (error: Error) => {
      setIsLoading(false)
      setErrorMessage(error.message)
      setShowErrorModal(true)
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
