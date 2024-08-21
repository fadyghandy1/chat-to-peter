import Logic from './Logic'
import { StyledBox } from '../../wizard.styles'
import SubForm from './components/SubForm/SubForm'
import AdvancedTable from '../../../../../../../components/common/AdvancedTable/AdvancedTable'
import ConfirmationDialog from '../../../../../../../components/common/ConfirmationDialog/ConfirmationDialog'
import PreviewModal from './components/PreviewModal/PreviewModal'
import { Backdrop, Box, CircularProgress } from '@mui/material'

const Attachments = ({ values, setFieldValue, mode }) => {
  const { resetEditableRow, columns, intl, previewLoading, caseDocuments, refetch, data, documentId, handleEditSuccess, showDialog, setShowDialog, handleDelete, actions, caseNumberID, previewModalRef } = Logic(values, setFieldValue)

  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDFILE.ATTACHMENTS' })}</div>
      <SubForm refetch={refetch} caseNumberID={caseNumberID} row={data} documentId={documentId} handleEditSuccess={handleEditSuccess} resetEditableRow={resetEditableRow} />
      {/* {caseDocuments?.length > 0 && <AppTable rows={caseDocuments} columns={columns} />} */}
      {caseDocuments?.length > 0 && <AdvancedTable Actions={actions} rows={caseDocuments} columns={columns} header="Search Results" reportTitle={'Invoice Results'} />}

      <ConfirmationDialog onClick={handleDelete} onClose={() => setShowDialog(false)} visible={showDialog} title={intl.formatMessage({ id: 'DELETE.CONFIRMATION' })} />

      <Backdrop open={previewLoading}>
        <CircularProgress />
      </Backdrop>

      <PreviewModal ref={previewModalRef} />
    </StyledBox>
  )
}

export default Attachments
