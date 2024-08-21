import { useState, useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
import { contactsTableColumns } from './constants'

const Logic = ({ setFieldValue, values }) => {
  const intl = useIntl()
  const [editableRow, setEditableRow] = useState({ row: null, index: null })
  const modalRef = useRef()
  const { addFlashMessage } = UseFlashMessage()
  // const [initialState, setInitialState] = useState(attachmentsInputsInitials)

  const deleteSelectedDocument = (row, index) => {
    if (modalRef.current) modalRef.current.open(row)
  }

  const editSelectedDocument = (row, index) => {
    setEditableRow({ row, index })
  }
  const resetEditableRow = () => {
    console.log('resetEditableRow', ' contact logic')
    setEditableRow({ row: null, index: null })
  }
  // const editSelectedDocument = (row, index) => {
  //   const selectedContact = values.contacts?.find((ele, _index) => _index === index)

  //   dispatch(
  //     update([
  //       {
  //         prop: 'contactsValues',
  //         value: selectedContact,
  //       },
  //     ])
  //   )
  // }
  const setContacts = (contact) => {
    // if (editableRow.index != null) {
    //   const contacts = values.contacts.map((el, _index) => {
    //     if (_index == editableRow.index) {
    //       // return { ...attachment, attachmentEndDate: attachment?.attachmentEndDate ? attachment?.attachmentEndDate?.toISOString() : '' }
    //       return { ...contact }
    //     }
    //     return el
    //   })
    //   setFieldValue('contacts', contacts)
    //   setEditableRow({ row: null, index: null })
    // } else {
    //   setFieldValue('contacts', [...values.contacts, contact])
    // }
    if (editableRow.row) {
      const contacts = values.contacts.map((el, index) => {
        if ((el.id && el.id == editableRow.row?.id) || (el.localId && el.localId == editableRow.row?.localId)) {
          return { ...el, ...contact }
        }
        return el
      })

      setFieldValue('contacts', contacts)
      setEditableRow({ row: null, index: null })
    } else {
      setFieldValue('contacts', [...values.contacts, { ...contact, localId: (Date.now() + '-' + Math.random()).toString(16).replace(/\./g, '') }])
    }
  }
  const actions = {
    deleteSelectedDocument: deleteSelectedDocument,
    editSelectedDocument: editSelectedDocument,
  }

  let columns = useMemo(() => contactsTableColumns(actions, intl), [values.contacts])
  return { addFlashMessage, columns, editableRow, setContacts, modalRef, resetEditableRow }
}
export default Logic
