import { ReactNode } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import { Cancel } from '@mui/icons-material'

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const closeButtonStyle = {
  position: 'absolute',
  top: '0.625rem',
  right: '0'
}

interface BaseModalProps {
  children: ReactNode
  show: boolean
  onHide: () => void
}

const BaseModal = ({ children, show, onHide }: BaseModalProps) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={show}
      onClose={onHide}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={show}>
        <Box sx={boxStyle}>
          <Button onClick={onHide} sx={closeButtonStyle}>
            <Cancel color='error' />
          </Button>
          {children}
        </Box>
      </Fade>
    </Modal>
  )
}

export default BaseModal
