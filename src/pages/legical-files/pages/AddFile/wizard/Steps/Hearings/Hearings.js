import Logic from './Logic'
import AppTable from '../../../../../../../components/common/AppTable/AppTable.styles'
import { StyledBox } from '../../wizard.styles'
import SubForm from './components/SubForm/SubForm'
import ConfirmationDialog from '../../../../../../../components/common/ConfirmationDialog/ConfirmationDialog'

const Hearings = ({ values, setFieldValue }) => {
  const { columns, data, intl, hearings, refetch, hearingId, handleEditSuccess, showDialog, setShowDialog, handleDelete, resetEditableRow, formRef } = Logic(values, setFieldValue)
  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDFILE.HEARINGS' })}</div>
      {hearings.length > 0 && <AppTable rows={hearings} columns={columns} />}
      <SubForm refetch={refetch} row={data} hearingId={hearingId} handleEditSuccess={handleEditSuccess} resetEditableRow={resetEditableRow} ref={formRef} />
      <ConfirmationDialog onClick={handleDelete} onClose={() => setShowDialog(false)} visible={showDialog} title={intl.formatMessage({ id: 'DELETE.CONFIRMATION' })} />
    </StyledBox>
  )
}

export default Hearings
