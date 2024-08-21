import { useState } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import UseFlashMessage from '../../../../../../../utils/hooks/UseFlashMessage'

const checkIfValueIsTruthyValue = (value) => {
  return value !== null && value !== undefined && value !== ''
}

const Logic = ({ setFieldValue, values }) => {
  const [isLoading, setIsLoading] = useState(false)
  const state = useSelector((state) => {
    const { attachmentsValues } = state.addClient
    return { attachmentsValues }
  }, shallowEqual)

  const attachmentsInputsInitials = {
    documentType: state.attachmentsValues.documentType,
    date: state.attachmentsValues.date,
    documentName: state.attachmentsValues.documentName,
    document: state.attachmentsValues.document,
    index: state.attachmentsValues.index,
  }

  const { addFlashMessage } = UseFlashMessage()

  const onAddDocumentSubmit = (inputValues, { resetForm }) => {
    if (checkIfValueIsTruthyValue(inputValues.index)) {
      const remainAttachment = values.attachments.filter((val) => val.index !== inputValues.index)
      setFieldValue('attachments', [...remainAttachment, { ...inputValues, index: remainAttachment.length }])
    } else {
      setFieldValue('attachments', [...values.attachments, { ...inputValues, index: values.attachments.length }])
    }
    console.log(values)
    resetForm()
    // setFieldValue('document', '')
  }

  return { onAddDocumentSubmit, addFlashMessage, attachmentsInputsInitials, isLoading }
}
export default Logic
