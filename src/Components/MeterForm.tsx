import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { Meter } from '@/Utils/types'
import { defaultMeter, showedMeterProperties, slugToTitle } from '@/Utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postMeter, putMeter } from '@/Utils/api'
import DeleteMeterButton from './Buttons/DeleteMeterButton'
import { LoadingButton } from '@mui/lab'
import ErrorModal from './Modals/ErrorModal'

interface MeterFormProps {
  meter?: Meter
  onHide?: () => void
}

const formControlStyle = {
  margin: '1rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  alignItems: 'flex-start',

  '& > *': {
    width: '100%',
    maxWidth: '100%',
    justifyContent: 'space-between',
    gap: '1rem'
  },

  '& > label': {
    marginLeft: '0'
  },

  '& > button': {
    alignSelf: 'center',
    width: '100px'
  }
}

const MeterForm = ({ meter, onHide }: MeterFormProps) => {
  const [formValues, setFormValues] = useState<Meter>(meter ?? defaultMeter)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const queryClient = useQueryClient()

  const mutationFunction = meter ? putMeter : postMeter

  const handleError = (error: string) => {
    setIsLoading(false)
    setErrorMessage(error || 'Something went wrong, please try again later')
    setShowErrorModal(true)
  }

  const { mutate } = useMutation({
    mutationFn: mutationFunction,
    onMutate: () => setIsLoading(true),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['meters']
      })
      setIsLoading(false)
      if (res.error) {
        handleError(res.error)
      } else {
        onHide?.()
      }
    },
    onError: (error: Error) => {
      handleError(error.message)
    }
  })

  const isValidData = (data: any) => {
    const errors: string[] = []

    showedMeterProperties.forEach((property) => {
      if (
        property === 'active' ||
        property === 'used_for_billing' ||
        property === 'type'
      )
        return

      if (!data[property]) {
        errors.push(slugToTitle(property))
      }
    })

    if (errors.length > 0) {
      setErrorMessage('Please fill out this field')
      return false
    }

    setErrorMessage('')
    return true
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isValidData(formValues)) return

    mutate(formValues)
  }

  const onChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEventHandler<HTMLInputElement>
      | SelectChangeEvent
  ) => {
    if ('target' in e === false) return

    const input = e.target as HTMLInputElement

    const isCheckbox = input.type === 'checkbox'

    if (isCheckbox && 'checked' in e.target) {
      setFormValues({ ...formValues, [input.name]: input.checked })
      return
    }

    setFormValues({ ...formValues, [input.name]: input.value })
  }

  return (
    <FormControl sx={formControlStyle} component='form' onSubmit={handleSubmit}>
      {showedMeterProperties.map((property) => {
        if (property === 'active' || property === 'used_for_billing')
          return (
            <FormControlLabel
              key={property}
              control={
                <Checkbox
                  checked={formValues[property] as boolean}
                  onChange={onChange}
                  name={property}
                />
              }
              label={slugToTitle(property)}
              labelPlacement='start'
            />
          )
        else if (property === 'type')
          return (
            <FormControlLabel
              key={property}
              control={
                <Select
                  key={property}
                  labelId='type-label'
                  name={property}
                  onChange={onChange}
                  value={formValues[property] as string}
                >
                  <MenuItem value='sum'>Sum</MenuItem>
                  <MenuItem value='max'>Max</MenuItem>
                  <MenuItem value='unique_count'>Unique Count</MenuItem>
                </Select>
              }
              label={slugToTitle(property)}
              labelPlacement='start'
            />
          )
        else
          return (
            <TextField
              key={property}
              label={slugToTitle(property)}
              variant='outlined'
              name={property}
              value={formValues[property as keyof Meter] as string}
              onChange={onChange as ChangeEventHandler<HTMLInputElement>}
              required
              error={errorMessage !== ''}
              helperText={errorMessage}
            />
          )
      })}

      <LoadingButton
        type='submit'
        variant='contained'
        color='success'
        loading={isLoading}
      >
        Submit
      </LoadingButton>

      {meter && <DeleteMeterButton meterId={meter.id} />}

      <ErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorMessage={errorMessage}
      />
    </FormControl>
  )
}

export default MeterForm
