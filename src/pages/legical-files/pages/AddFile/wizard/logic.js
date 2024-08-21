import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import * as Yup from 'yup'
import FileInfo from './Steps/FileInfo/FileInfo'
// import Parties from './Steps/Parties/Parties'
// import Teamwork from './Steps/Teamwork/Teamwork'
import Attachments from './Steps/Attachments/Attachments'
import Stages from './Steps/Stages/Stages'
import Hearings from './Steps/Hearings/Hearings'

function Logic() {
  const [isLoading, setIsLoading] = useState(false)
  const intl = useIntl()
  const stepsWizard = [
    {
      label: intl.formatMessage({ id: 'ADDFILE.FILEINFO' }),
      isMandatory: true,
      component: FileInfo,
      validationSchema: Yup.object().shape({
        fileId: Yup.string().required(intl.formatMessage({ id: 'VALIDATION.FILE' })),
      }),
    },
    // {
    //   label: intl.formatMessage({ id: 'ADDFILE.PARTIES' }),
    //   isMandatory: true,
    //   component: Parties,
    //   validationSchema: Yup.object().shape({
    //     // nServiceCenterId: Yup.object().nullable().required('This field is required'),
    //   }),
    // },
    // {
    //   label: intl.formatMessage({ id: 'ADDFILE.TEAMWORK' }),
    //   isMandatory: true,
    //   component: Teamwork,
    //   validationSchema: Yup.object().shape({
    //     // name: Yup.string().required('This field is required'),
    //     // phone: Yup.string().nullable().required('This field is required'),
    //   }),
    // },
    {
      label: intl.formatMessage({ id: 'ADDFILE.STAGES' }),
      isMandatory: true,
      component: Stages,
      validationSchema: Yup.object().shape({
        stages: Yup.array().min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.STAGES' }) })),
      }),
    },
    {
      label: intl.formatMessage({ id: 'ADDFILE.HEARINGS' }),
      isMandatory: true,
      component: Hearings,
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
