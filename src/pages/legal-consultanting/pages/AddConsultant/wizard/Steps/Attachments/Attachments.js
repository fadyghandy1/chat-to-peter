import Logic from './Logic'
import { StyledBox } from '../../wizard.styles'
import SubForm from './components/SubForm/SubForm'
import AppTable from '../../../../../../../components/common/AppTable/AppTable.styles'

const Attachments = ({ values, setFieldValue }) => {
  const { setAttachments, columns, editableRow, intl } = Logic(values, setFieldValue)

  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDFILE.ATTACHMENTS' })}</div>
      <SubForm setAttachments={setAttachments} row={editableRow.row} />
      {values.attachments.length > 0 && <AppTable rows={values.attachments} columns={columns} />}
    </StyledBox>
  )
}

export default Attachments
