import { useState } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import UseFlashMessage from '../../../../../../../utils/hooks/UseFlashMessage'

const checkIfValueIsTruthyValue = (value) => {
  return value !==null && value !==undefined && value !== ''
}

const Logic = ({ setFieldValue, values }) => {
  const [isLoading, setIsLoading] = useState(false)
  const state = useSelector((state) => {
    const { contactsValues } = state.addClient
    return { contactsValues }
  }, shallowEqual)
  
  const constactInputsInitials = {
    contactName: state.contactsValues.contactName,
    contactJob: state.contactsValues.contactJob,
    contactPhone: state.contactsValues.contactPhone,
    contactEmail: state.contactsValues.contactEmail,
    contactUserName: state.contactsValues.contactUserName,
    contactPassword: state.contactsValues.contactPassword,
    index: state.contactsValues.index
  }

  const { addFlashMessage } = UseFlashMessage()

  const onContactSubmit = (inputValues, { resetForm }) => {
    if (checkIfValueIsTruthyValue(inputValues.index)) {
      const remainContacts = values.attachments.filter(val => val.index !== inputValues.index)
      setFieldValue('contacts', [...remainContacts, { ...inputValues, index: remainContacts.length }])
    } else {

      setFieldValue('contacts', [...values.contacts, { ...inputValues, index: values.contacts.length }])
    }
    console.log(values)
    resetForm()
  }
  return { onContactSubmit, addFlashMessage, constactInputsInitials, isLoading }
}
export default Logic
