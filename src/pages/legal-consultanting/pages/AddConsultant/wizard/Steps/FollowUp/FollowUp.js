import Logic from './Logic'
import { StyledBox } from '../../wizard.styles'
import SubForm from './components/SubForm/SubForm'
import AppTable from '../../../../../../../components/common/AppTable/AppTable.styles'

const FollowUp = ({ values, setFieldValue }) => {
  const { setStages, columns, editableRow, intl } = Logic(values, setFieldValue)

  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDCONSULT.FOLLOWUP' })}</div>
      <SubForm setStages={setStages} row={editableRow.row} />
      {values.stages.length > 0 && <AppTable rows={values.stages} columns={columns} />}
    </StyledBox>
  )
}

export default FollowUp
