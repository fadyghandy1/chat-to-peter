import Logic from './Logic'
import { StyledBox } from '../../wizard.styles'
import SubForm from './components/SubForm/SubForm'
import AppTable from '../../../../../../../components/common/AppTable/AppTable.styles'
import { Alert } from '@mui/material'
import ConfirmationDialog from '../../../../../../../components/common/ConfirmationDialog/ConfirmationDialog'

const Stages = ({ errors, values, setFieldValue }) => {
  console.log(values, 'fady values')
  const { columns, intl, stages, refetch, data, stageId, handleEditSuccess, showDialog, setShowDialog, handleDelete, editabledRow, resetEditableRow, formRef } = Logic(values, setFieldValue)

  return (
    <>
      {errors.stages && <Alert severity="error">{errors.stages}</Alert>}

      <StyledBox p={4}>
        <div className="stepsTitle">{intl.formatMessage({ id: 'ADDFILE.STAGES' })}</div>
        {stages?.length > 0 && <AppTable rows={stages} columns={columns} />}
        <SubForm refetch={refetch} row={data} stageId={stageId} handleEditSuccess={handleEditSuccess} editabledRow={editabledRow} resetEditableRow={resetEditableRow} clientValues={values} ref={formRef} />
        <ConfirmationDialog onClick={handleDelete} onClose={() => setShowDialog(false)} visible={showDialog} title={intl.formatMessage({ id: 'DELETE.CONFIRMATION' })} />
      </StyledBox>
    </>
  )
}

export default Stages
