import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import * as Yup from 'yup'

import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { addClient, editClient } from '../../../../../../services/ClientServices'
import { extractBase64FromDataURI, getFileTypeFromDataURI } from '../../../../../../utils/common'
import { useNavigate } from 'react-router-dom'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
import { clientDetailsValidateSchema } from '../constants'
import { modes } from '../../../../../../components/common/wizard'
import ClientDetails from '../../Steps/ClientDetails/ClientDetails'
import Attachments from '../../Steps/Attachments/Attachments'
import LoginData from '../../Steps/LoginData/LoginData'
import Contacts from '../../Steps/Contacts'

function Logic({ mode, clientID, handleOnUpdated }) {
  const intl = useIntl()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { addFlashMessage } = UseFlashMessage()

  const stepsWizard = [
    {
      label: intl.formatMessage({ id: 'ADDCLIENT.CLIENT_DETAILS' }),
      isMandatory: true,
      component: ClientDetails,
      validationSchema: clientDetailsValidateSchema(intl),
      props: { corporate: true },
    },
    {
      label: intl.formatMessage({ id: 'ADDCLIENT.ATTACHMENTS' }),
      isMandatory: true,
      component: Attachments,
      validationSchema: Yup.object().shape({}),
    },
    {
      label: intl.formatMessage({ id: 'ADDCLIENT.LOGIN_DATA' }),
      isMandatory: true,
      component: LoginData,
      validationSchema: Yup.object().shape({
        credentialPassword: Yup.string()
          .notRequired()
          .nullable()
          .transform((value) => (!!value ? value : null))
          .min(8, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDCLIENT.PASSWORD' }), length: 8 }))
          .matches(/^(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z])(?=.*[0-9])/, intl.formatMessage({ id: 'VALIDATION.PASSWORD' })),
      }),
    },
    {
      label: intl.formatMessage({ id: 'ADDCLIENT.CONTACT_PERSON' }),
      isMandatory: true,
      component: Contacts,
      validationSchema: Yup.object().shape({}),
    },
  ]
  const addClientMutation = useMutation((credentials) => addClient(credentials), {
    onSuccess: (response) => {
      // dispatch(appUpdate([{ prop: 'token', value: response.data.token }]))
      navigate('/', { replace: true })
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'CLIENT.ADD.SUCCESSFULLY.CONFIRMATION' }) })
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  const editClientMutation = useMutation((credentials) => editClient(credentials), {
    onSuccess: (response) => {
      handleOnUpdated()
      // dispatch(appUpdate([{ prop: 'token', value: response.data.token }]))
      // navigate('/', { replace: true })
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'CLIENT.EDIT.SUCCESSFULLY.CONFIRMATION' }) })
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })
  const onFormSubmit = async (values) => {
    setIsLoading(true)
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
          issuedDate: attach.issuedDate || null,
          expiryDate: attach.expiryDate || null,
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
    const contacts = values.contacts.map((el) => {
      debugger
      const contactData = {
        name: el.contactName,
        phone: el.contactPhone,
        mobileNumber: el.contactMobile,
        email: el.contactEmail,
        userName: el.contactUserName,
        password: el.contactPassword,
        job: el.contactJob,
        hasPowerOfAttorny: el.hasPowerOfAttorny,
        allowContact: el.allowContact,
        isDeleted: el.isDeleted,
        // type: string,
      }

      if (mode === modes.ADD) {
        return contactData
      }
      if (el.id) {
        return {
          ...contactData,
          id: el.id,
          clientId: clientID,
        }
      }
      return {
        ...contactData,
        clientId: clientID,
      }
    })

    const payload = {
      client: {
        clientArName: values.clientArName,
        clientEnName: values.clientEnName,
        branchId: values?.branchId?.id,
        telephoneNumber: values.telephoneNumber,
        email: values.email,
        email2: values.email2,
        fax: values.fax,
        mobileNumber: values.mobileNumber,
        nationalityId: values?.nationalityId?.id,
        postalCode: values.postalCode,
        cityId: values?.cityId?.id || null,
        street: values.street,
        apartmentNumber: values.apartmentNumber,
        clientTypeId: values?.clientTypeId?.id,
        valueOfWorkingHour: values.valueOfWorkingHour === '' ? 0 : values.valueOfWorkingHour,
        companyName: values.companyName,
        address: values.address,
        referenceNumber: values.referenceNumber,
        localIdentificationNumber: values.localIdentificationNumber,
        passportNumber: values.passportNumber,
        buildingNumber: values.buildingNumber,
        companyNameId: values.company?.id,
      },
      clientContactPersons: contacts,
      clientDocuments: documentDTO,
      clientPortalCredentials: [
        {
          userName: values.credentialUserName,
          password: values.credentialPassword,
        },
      ],
      isCompany: true,
    }
    try {
      if (mode === modes.ADD) {
        await addClientMutation.mutateAsync(payload)
      } else if (mode === modes.EDIT) {
        payload.client.id = values.id
        const editPayload = {
          ...payload,
          clientPortalCredentials: [
            {
              id: values.credentialID,
              clientId: clientID,
              userName: values.credentialUserName,
              password: values.credentialPassword,
            },
          ],
        }
        await editClientMutation.mutateAsync(editPayload)
      }
    } catch (error) {
      debugger
      console.log(error)
    }
  }

  return { onFormSubmit, isLoading, stepsWizard }
}

export default Logic
