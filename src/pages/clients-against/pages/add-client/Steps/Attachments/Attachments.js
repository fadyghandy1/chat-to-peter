import Logic from './Logic'
import SubForm from './components/SubForm/SubForm'
import AppTable from '../../../../../../components/common/AppTable/AppTable.styles'
import DeleteModal from './components/DeleteModal/DeleteModal'
import PreviewModal from './components/PreviewModal/PreviewModal'
import { StyledBox } from '../../../../../../assets/styles/components.styles'

const Attachments = ({ values, setFieldValue, mode }) => {
  const { setAttachments, columns, editableRow, intl, modalRef, resetEditableRow, previewModalRef } = Logic(values, setFieldValue)
  const filteredAttachments = values.attachments.filter((e) => !e.document?.isDeleted)
  console.log(resetEditableRow, 'attatchment')
  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDFILE.ATTACHMENTS' })}</div>
      <SubForm setAttachments={setAttachments} row={editableRow.row} mode={mode} resetEditableRow={resetEditableRow} />
      {filteredAttachments?.length > 0 && <AppTable rows={filteredAttachments} columns={columns} />}
      <DeleteModal ref={modalRef} resetEditableRow={resetEditableRow} editableRow={editableRow.row} values={values} setFieldValue={setFieldValue} />
      <PreviewModal ref={previewModalRef} />
    </StyledBox>
  )
}

export default Attachments
