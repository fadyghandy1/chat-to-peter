import React from 'react'
import { useIntl } from 'react-intl'
import Inputs from './Inputs'
import { StyledBox } from '../../wizard.styles'
import AppTable from '../../../../../../../components/common/AppTable/AppTable.styles'
import Logic from './tableLogic'

const Index = (props) => {
  const { columns } = Logic(props)
  const intl = useIntl()
  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDCLIENT.ATTACHMENTS' })}</div>
      <Inputs {...props} />
      {props?.values?.attachments.length > 0 && <AppTable rows={props.values.attachments} columns={columns} />}
    </StyledBox>
  )
}

export default Index
