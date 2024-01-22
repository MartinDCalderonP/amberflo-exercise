import { Typography } from '@mui/material'
import BaseModal from './BaseModal'

interface AddMeterModalProps {
  show: boolean
  onHide: () => void
}

const AddMeterModal = ({ show, onHide }: AddMeterModalProps) => {
  return (
    <BaseModal show={show} onHide={onHide}>
      <Typography variant='h4'>Add Meter</Typography>
    </BaseModal>
  )
}

export default AddMeterModal
