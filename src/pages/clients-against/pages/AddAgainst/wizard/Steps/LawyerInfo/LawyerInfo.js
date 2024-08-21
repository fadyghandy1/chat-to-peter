import React from 'react'
import SubForm from './components/SubForm/Subform.js'
import { StyledBox } from '../../wizard.styles.js'
import AppTable from '../../../../../../../components/common/AppTable/AppTable.styles.js'
import Logic from './Logic.js'
import ConfirmationDialog from '../../../../../../../components/common/ConfirmationDialog/ConfirmationDialog.js'

const LawyerInfo = ({ values, setFieldValue }) => {
  const { columns, setLawyers, editableRow, intl, showDialog, setShowDialog, handleDelete, resetEditableRow } = Logic(values, setFieldValue)
  const filteredLawyers = values.lawyers.filter((e) => !e.isDeleted)

  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDOPPONENT.LAWYER_INFO' })}:</div>
      <SubForm setLawyers={setLawyers} row={editableRow.row} resetEditableRow={resetEditableRow} />
      {filteredLawyers.length > 0 && <AppTable rows={filteredLawyers} columns={columns} />}
      <ConfirmationDialog onClick={handleDelete} onClose={() => setShowDialog(false)} visible={showDialog} title={intl.formatMessage({ id: 'DELETE.CONFIRMATION' })} />
    </StyledBox>
  )
}

export default LawyerInfo
