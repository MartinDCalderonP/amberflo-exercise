import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import BaseModal from './BaseModal'

interface ErrorModalProps {
  open: boolean
  onClose: () => void
  errorMessage: string
}

const ErrorModal = ({ open, onClose, errorMessage }: ErrorModalProps) => {
  return (
    <BaseModal show={open} onHide={onClose}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='error-modal-title'
        aria-describedby='error-modal-description'
      >
        <DialogTitle id='error-modal-title'>Error</DialogTitle>
        <DialogContent>
          <DialogContentText id='error-modal-description'>
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </BaseModal>
  )
}

export default ErrorModal
