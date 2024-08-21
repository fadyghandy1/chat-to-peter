import React, { forwardRef } from 'react'
import ConfirmationDialog from '../../../../../../components/common/ConfirmationDialog/ConfirmationDialog.styles'
import Logic from './Logic'

const DeleteModal = forwardRef(({ searchRef }, ref) => {
  const { confirmButtonDisabled, setShowDialog, showDialog, selectedClientID, onSubmit, intl } = Logic({ ref, searchRef })

  return (
    <>
      {selectedClientID && (
        <ConfirmationDialog
          onClick={() => {
            onSubmit()
          }}
          onClose={() => setShowDialog(false)}
          visible={showDialog}
          title={intl.formatMessage({ id: 'DELETE.CONFIRMATION' })}
          confirmButtonDisabled={confirmButtonDisabled}
        />
      )}
    </>
  )
})

export default DeleteModal
