import React, { useState} from 'react'
import * as Yup from 'yup'
import { useIntl } from 'react-intl'

import ClientDetails from './Steps/ClientDetails/ClientDetails'
import Attachments from './Steps/Attachments/index'
import Contacts from './Steps/Contacts'
function Logic() {
  // const dispatch = useDispatch()
  // const { addFlashMessage } = UseFlashMessage()
  // const state = useSelector((state) => {
  //   const { searchResult } = state.RenewalServiceSlice
  //   return { searchResult }
  // }, shallowEqual)
  // const result = state.searchResult
  
  const intl = useIntl()

  const stepsWizard = [
    {
      label: intl.formatMessage({ id: 'ADDEXPERT.EXPERT_DETAILS' }),
      isMandatory: true,
      component: ClientDetails,
      validationSchema: Yup.object().shape({
        nameAr: Yup.string().nullable().required('This field is required'),
        // sPlateNumber: Yup.string().required('This field is required').max(12, 'characters not allowed to be more than 12'),
      }),
    },
    {
      label: intl.formatMessage({ id: 'ADDEXPERT.CONTACT_PERSON' }),
      isMandatory: true,
      component: Contacts,
      validationSchema: Yup.object().shape({
        //   nameAr: Yup.string().nullable().required('This field is required'),
        }),
    },
    {
      label: intl.formatMessage({ id: 'ADDEXPERT.ATTACHMENTS' }),
      isMandatory: true,
      component: Attachments,
      validationSchema: Yup.object().shape({
        //   nameAr: Yup.string().nullable().required('This field is required'),
        // sPlateNumber: Yup.string().required('This field is required').max(12, 'characters not allowed to be more than 12'),
      }),
    },
  ]
  

const [isLoading, setIsLoading] = useState(false)
  const InitialValueWizard = {
    sPlateNumber:  '',
    sVin:  '',
    nStateId:  null,
    nServiceId:  null,
    sSubTypeCategory:  null,
    sSubTypeNameEn:  null,
    totalFees:  '0',
    nServiceCenterId:  null,
    name:  '',
    attachments: [],
    contacts: []
  }
  

  const onFormSubmit = (values) => {
    console.log('submit', values)
    // let regex = /[()\s]/g
    // setIsLoading(true)
    // setCreatedInvoice()
  }

  return { onFormSubmit, InitialValueWizard, isLoading, stepsWizard}
}

export default Logic
