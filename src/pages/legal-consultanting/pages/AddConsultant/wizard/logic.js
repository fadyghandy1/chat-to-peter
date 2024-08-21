import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import * as Yup from 'yup'
import ConsultantDetails from './Steps/ConsultantDetails/ConsultantDetails'
import Attachments from './Steps/Attachments/Attachments'
import FollowUp from './Steps/FollowUp/FollowUp'

function Logic() {
  const [isLoading, setIsLoading] = useState(false)
  const intl = useIntl()
  const stepsWizard = [
    {
      label: intl.formatMessage({ id: 'ADDCONSULT.CONSULT_DETAILS' }),
      isMandatory: true,
      component: ConsultantDetails,
      validationSchema: Yup.object().shape({
        // sPlateNumber: Yup.string().required('This field is required').max(12, 'characters not allowed to be more than 12'),
        // sVin: Yup.string().nullable().required('This field is required'),
        // nStateId: Yup.object().nullable().required('This field is required').typeError('This field value can not matched'),
        // nServiceId: Yup.object().nullable().required('This field is required').typeError('This field value can not matched'),
        // sSubTypeCategory: Yup.object().nullable().required('This field is required').typeError('This field value can not matched'),
        // sSubTypeNameEn: Yup.object().nullable().required('This field is required').typeError('This field value can not matched'),
      }),
    },
    {
      label: intl.formatMessage({ id: 'ADDCONSULT.FOLLOWUP' }),
      isMandatory: true,
      component: FollowUp,
      validationSchema: Yup.object().shape({
        // name: Yup.string().required('This field is required'),
        // phone: Yup.string().nullable().required('This field is required'),
      }),
    },
    {
      label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTS' }),
      isMandatory: true,
      component: Attachments,
      validationSchema: Yup.object().shape({
        // name: Yup.string().required('This field is required'),
        // phone: Yup.string().nullable().required('This field is required'),
      }),
    },
  ]
  const onFormSubmit = (values) => {
    console.log('submit', values)
  }

  return { onFormSubmit, isLoading, stepsWizard }
}

export default Logic
