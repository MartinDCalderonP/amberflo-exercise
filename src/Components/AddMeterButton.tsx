import { useState } from 'react'
import AddMeterModal from './Modals/AddMeterModal'
import { Button } from '@mui/material'

const buttonStyle = {
  margin: '1rem 0',
  alignSelf: 'flex-end'
}

const AddMeterButton = () => {
  const [showModal, setShowModal] = useState(false)

  const handleToggleModal = () => setShowModal(!showModal)

  return (
    <>
      <Button
        color='success'
        onClick={handleToggleModal}
        sx={buttonStyle}
        variant='contained'
      >
        Add Meter
      </Button>
      <AddMeterModal show={showModal} onHide={handleToggleModal} />
    </>
  )
}

export default AddMeterButton
