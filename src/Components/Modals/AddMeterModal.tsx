import { Typography } from '@mui/material'
import BaseModal from './BaseModal'
import MeterForm from '../MeterForm'

interface AddMeterModalProps {
  show: boolean
  onHide: () => void
}

const AddMeterModal = ({ show, onHide }: AddMeterModalProps) => {
  return (
    <BaseModal show={show} onHide={onHide}>
      <Typography variant='h4'>Add Meter</Typography>
      <MeterForm />
    </BaseModal>
  )
}

export default AddMeterModal
