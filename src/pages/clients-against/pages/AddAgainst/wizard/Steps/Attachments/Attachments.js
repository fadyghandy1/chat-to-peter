import Logic from './Logic'
import { StyledBox } from '../../wizard.styles'
import SubForm from './components/SubForm/SubForm'
import AppTable from '../../../../../../../components/common/AppTable/AppTable.styles'
import ConfirmationDialog from '../../../../../../../components/common/ConfirmationDialog/ConfirmationDialog'
import PreviewModal from './components/PreviewModal/PreviewModal'

const Attachments = ({ values, setFieldValue, mode }) => {
  const { setAttachments, columns, editableRow, intl, showDialog, setShowDialog, handleDelete, resetEditableRow, previewModalRef } = Logic(values, setFieldValue)
  const filteredAttachments = values.attachments.filter((e) => !e.document?.isDeleted)
  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDFILE.ATTACHMENTS' })}</div>
      <SubForm setAttachments={setAttachments} row={editableRow.row} mode={mode} resetEditableRow={resetEditableRow} />
      {filteredAttachments.length > 0 && <AppTable rows={filteredAttachments} columns={columns} />}
      <ConfirmationDialog onClick={handleDelete} onClose={() => setShowDialog(false)} visible={showDialog} title={intl.formatMessage({ id: 'DELETE.CONFIRMATION' })} />
      <PreviewModal ref={previewModalRef} />
    </StyledBox>
  )
}

export default Attachments
