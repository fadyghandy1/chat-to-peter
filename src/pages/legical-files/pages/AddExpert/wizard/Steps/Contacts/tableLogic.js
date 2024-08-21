import { useState, useMemo, useRef } from 'react'
import { AddExpertSlice } from '../../../AddExpertSlice'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import UseFlashMessage from '../../../../../../../utils/hooks/UseFlashMessage'
import { contactsTableColumns } from '../../../constants'

const Logic = ({ setFieldValue, values }) => {
  const dispatch = useDispatch()
  const { update, reset } = AddExpertSlice.actions
  const { addFlashMessage } = UseFlashMessage()
  // const [initialState, setInitialState] = useState(attachmentsInputsInitials)

  const deleteSelectedDocument = (row) => {
    const undeletedAttachments = values?.attachments?.filter((ele, _index) => ele.index !== row.index)
    setFieldValue('contacts', undeletedAttachments)
  }

  const editSelectedDocument = (row) => {
    const selectedContact = values.contacts?.find((ele, _index) => ele.index === row.index)

    dispatch(
        update([
          {
            prop: 'contactsValues',
            value: selectedContact,
          },
        ])
      )
    
  }

  const actions = {
    deleteSelectedDocument: deleteSelectedDocument,
    editSelectedDocument: editSelectedDocument,
  }

  let columns = useMemo(() => contactsTableColumns(actions), [values.contacts])
  return { addFlashMessage, columns }
}
export default Logic
