import React from 'react'
import { DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material'
import { useIntl } from 'react-intl'
import AppButton from '../AppButton/AppButton'

const ConfirmationDialog = ({ onClick, onClose, visible = false, title = '', confirmButtonDisabled = false, children }) => {
  const intl = useIntl()
  return (
    <Dialog fullWidth open={visible} onClose={onClose}>
      <DialogTitle> {title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <AppButton disabled={confirmButtonDisabled} onClick={onClick}>
          {intl.formatMessage({ id: 'CONFIRMATION_DIALOG.CONFIRM' })}
        </AppButton>
        <AppButton variant="outlined" onClick={onClose}>
          {intl.formatMessage({ id: 'CONFIRMATION_DIALOG.CANCEL' })}
        </AppButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
