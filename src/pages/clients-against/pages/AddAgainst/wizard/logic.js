import React, { useState } from 'react'
import * as Yup from 'yup'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'

import { addOpponent, editOpponent } from '../../../../../services/OpponentServices'
import UseFlashMessage from '../../../../../utils/hooks/UseFlashMessage'
import opponentDetails from './Steps/OpponentDetails/OpponentDetails'
import Attachments from './Steps/Attachments/Attachments'
import LawyerInfo from './Steps/LawyerInfo/LawyerInfo'
import { useNavigate } from 'react-router-dom'
import { extractBase64FromDataURI, getFileTypeFromDataURI } from '../../../../../utils/common'
import { modes } from '../../../../../components/common/wizard'
import { opponentDetailsValidateSchema } from '../constants'

function Logic({ mode, againstId, handleOnUpdated }) {
  const intl = useIntl()
  const navigate = useNavigate()
  const { addFlashMessage } = UseFlashMessage()
  const [isLoading, setIsLoading] = useState(false)

  const stepsWizard = [
    {
      label: intl.formatMessage({ id: 'ADDOPPONENT.OPPONENT_DETAILS' }),
      isMandatory: true,
      component: opponentDetails,
      validationSchema: opponentDetailsValidateSchema(intl),
    },
    {
      label: intl.formatMessage({ id: 'ADDOPPONENT.LAWYER_INFO' }),
      isMandatory: true,
      component: LawyerInfo,
      validationSchema: Yup.object().shape({}),
    },
    {
      label: intl.formatMessage({ id: 'ADDOPPONENT.ATTACHMENTS' }),
      isMandatory: true,
      component: Attachments,
      validationSchema: Yup.object().shape({
        //   nameAr: Yup.string().nullable().required('This field is required'),
        // sPlateNumber: Yup.string().required('This field is required').max(12, 'characters not allowed to be more than 12'),
      }),
    },
  ]

  const addOpponentMutation = useMutation((credentials) => addOpponent(credentials), {
    onSuccess: (response) => {
      navigate('/', { replace: true })
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'ADD.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'OPPONENT' }) }) })
    },

    onSettled: () => {
      setIsLoading(false)
    },
  })

  const editOpponentMutation = useMutation((credentials) => editOpponent(credentials, againstId), {
    onSuccess: (response) => {
      handleOnUpdated(response.data?.data)

      // searchOpponent.mutateAsync({})
      // navigate('/', { replace: true })
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'EDIT.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'OPPONENT' }) }) })
    },

    onSettled: () => {
      setIsLoading(false)
    },
  })

  const onFormSubmit = async (values) => {
    try {
      setIsLoading(true)
      // const againstRefs = values.lawyers.map((lawyer) => {
      //   return {
      //     name: lawyer.lawyerName,
      //     phoneNumber: lawyer.lawyerPhone,
      //     mobileNumber: lawyer.lawyerMobile,
      //     email: lawyer.lawyerEmail,
      //   }
      // })

      const documentDTO = values?.attachments?.map((attach) => {
        const imageExtention = getFileTypeFromDataURI(attach?.attachment)
        const img = extractBase64FromDataURI(attach?.attachment)
        debugger
        let document = {
          document: {
            file: img,
            AttachmentTypeId: attach.attachmentType?.id,
            name: attach.attachmentName,
            extension: imageExtention,
            issuedDate: attach.attachmentIssuedDate || null,
            expiryDate: attach.attachmentEndDate || null,
          },
        }
        if (attach.documentId) {
          document = { ...document, documentId: attach.documentId }
        }
        if (attach?.document) {
          document = { ...document, document: { ...document.document, isDeleted: attach?.document?.isDeleted } }
        }
        return document
      })
      const payload = {
        againstDTO: {
          NameAr: values.nameAr,
          NameEn: values.nameEn,
          localIdentificationNumber: values.localIdentificationNumber,
          mobileNumber: values.mobile,
          PhoneNumber: values.telephone,
          email: values.email,
          postalCode: values.postCode,
          nationalityId: values.nationality?.id,
          PassportNumber: values.passport,
          cityId: values.city?.id,
          fax: values.fax,
          street: values.street,
          apartmentNumber: values.apartment,
          buildingNumber: values.buildingNu,
          reference: values.reference,
          clientTypeId: values.clientType?.id,
          address: values.address,
        },

        lawyers: values.lawyers,
        againstDocuments: documentDTO,
      }
      if (mode === modes.ADD) {
        await addOpponentMutation.mutateAsync(payload)
      } else if (mode === modes.EDIT) {
        payload.againstDTO.id = againstId
        await editOpponentMutation.mutateAsync(payload)
      }
    } catch (error) {
      // addFlashMessage({ type: 'error', message: 'eror'})
      console.log(error)
    }
  }

  return { onFormSubmit, isLoading, stepsWizard }
}

export default Logic
