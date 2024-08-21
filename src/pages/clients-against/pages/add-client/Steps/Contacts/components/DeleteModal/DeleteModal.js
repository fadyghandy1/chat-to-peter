import React, { forwardRef } from 'react'
import ConfirmationDialog from '../../../../../../../../components/common/ConfirmationDialog/ConfirmationDialog.styles'
import axios from 'axios'
import Logic from './Logic'

const DeleteModal = forwardRef(({ values, setFieldValue, resetEditableRow, editableRow }, ref) => {
  const { confirmButtonDisabled, setShowDialog, showDialog, row, onSubmit, intl } = Logic({ ref, values, setFieldValue, resetEditableRow, editableRow })

  return (
    <>
      {row && (
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
