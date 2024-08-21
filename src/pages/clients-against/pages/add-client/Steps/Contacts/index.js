import React from 'react'
import { useIntl } from 'react-intl'
import SubForm from './components/SubForm/SubForm'
import AppTable from '../../../../../../components/common/AppTable/AppTable.styles'
import Logic from './Logic'
import DeleteModal from './components/DeleteModal/DeleteModal'
import { StyledBox } from '../../../../../../assets/styles/components.styles'

const Index = (props) => {
  const { columns, editableRow, setContacts, modalRef, resetEditableRow } = Logic(props)
  const intl = useIntl()
  const filteredContacts = props?.values.contacts.filter((e) => !e.isDeleted)
  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDCLIENT.CONTACT_PERSON' })}</div>
      <SubForm editableRow={editableRow} setContacts={setContacts} {...props} resetEditableRow={resetEditableRow} />
      {filteredContacts.length > 0 && <AppTable rows={filteredContacts} columns={columns} />}
      <DeleteModal ref={modalRef} resetEditableRow={resetEditableRow} editableRow={editableRow.row} values={props.values} setFieldValue={props.setFieldValue} />
    </StyledBox>
  )
}

export default Index
