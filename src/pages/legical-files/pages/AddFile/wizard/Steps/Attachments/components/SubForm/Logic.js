import { useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import * as Yup from 'yup'
import { useFormikContext } from 'formik'
import { getImageType } from '../../../../../../../../../services/LookupsServices'
import { QUERY_KEY } from '../../../../../../../../../utils/constants/static'
import { useIntl } from 'react-intl'
import { createStageDocument, getAllStages, updateDocument } from '../../../../../../../../../services/StageServices'
import UseFlashMessage from '../../../../../../../../../utils/hooks/UseFlashMessage'
import { deleteNullOrUndefinedProperties, extractBase64FromDataURI, getFileTypeFromDataURI, getImageTypeFromBase64, handleBase64ToPreview } from '../../../../../../../../../utils/common'
import { maxFilesSizes, supportedFilesFormat } from '../../../../../../../../../utils/constants/config'

function Logic({ row, refetch, documentId, handleEditSuccess, caseNumberID }) {
  console.log(row, 'ffgfgfftftdrdrdr')
  const { addFlashMessage } = UseFlashMessage()
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'
  const formikWizard = useFormikContext()
  const formRef = useRef()
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    attachmentType: row?.attachmentTypeId || null,
    caseStage: caseNumberID || null,
    attachmentEndDate: row?.expiryDate || null,
    attachmentIssuedDate: row?.issuedDate || null,
    attachmentName: row?.name || '',
    attachment: handleBase64ToPreview({ base64: row?.fileContent, extension: row?.extension }) || '',
  }

  const validationSchema = Yup.object().shape({
    attachment: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .test('is-filetype', intl.formatMessage({ id: 'VALIDATION.FILETYPE' }), function (value) {
        const extension = getImageTypeFromBase64(value)

        return extension && supportedFilesFormat.includes(extension)
      })
      .test('fileSize', intl.formatMessage({ id: 'VALIDATION.FILESIZE' }) + maxFilesSizes / (1024 * 1024) + ' MB', (value) => (value?.size > 0 ? value.size : value?.replace(/=/g, '').length * 0.75) < maxFilesSizes),

    caseStage: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    attachmentType: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    attachmentName: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    attachmentIssuedDate: Yup.date().nullable(),

    attachmentEndDate: Yup.date()
      .nullable()
      .test('is-after-issuedDate', intl.formatMessage({ id: 'VALIDATION.ENDDATE' }, { fieldname1: intl.formatMessage({ id: 'ADDFILE.EXPIRYDATE' }), fieldname2: intl.formatMessage({ id: 'ADDFILE.ISSUEDDATE' }) }), function (value) {
        const { attachmentIssuedDate } = this.parent
        if (!attachmentIssuedDate) {
          return true
        }
        return value && new Date(value) > new Date(attachmentIssuedDate)
      }),
  })

  const submitAttachmentMutaion = useMutation((payload) => createStageDocument(payload), {
    onSuccess: (response) => {
      if (formRef.current) {
        formRef.current.resetForm()
      }
      refetch()
      addFlashMessage({ type: 'success', message: 'Case File Saved successfully ' })
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })
  const submitUpdateAttachmentMutaion = useMutation(({ payload, id }) => updateDocument({ payload, id }), {
    onSuccess: (response) => {
      if (formRef.current) {
        formRef.current.resetForm()
      }
      handleEditSuccess()
      addFlashMessage({ type: 'success', message: 'Case File Updated successfully ' })
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  const onSubmit = async (values) => {
    try {
      debugger
      setIsLoading(true)
      let payload = {
        name: values.attachmentName,
        attachmentTypeId: values.attachmentType?.id,
        issuedDate: values.attachmentIssuedDate,
        expiryDate: values.attachmentEndDate,

        extension: getFileTypeFromDataURI(values.attachment),
        entityId: values.caseStage?.id,
      }
      if (documentId) {
        await submitUpdateAttachmentMutaion.mutateAsync({ payload: { ...payload, id: row.id }, id: row.id })
      } else {
        await submitAttachmentMutaion.mutateAsync({ ...payload, fileContent: extractBase64FromDataURI(values.attachment) })
      }
    } catch (e) {}
  }

  const { data: attachmentTypes = [] } = useQuery(QUERY_KEY.imageType, async () => {
    return await getImageType().then((res) => {
      return res.data.data.models
    })
  })

  const { data: caseStages = [] } = useQuery('caseStages', async () => {
    return await getAllStages({ caseMasterId: formikWizard.values.fileId }).then((res) => {
      return res.data.models
    })
  })

  return { initialValues, onSubmit, attachmentTypes, validationSchema, caseStages, formRef, isLoading, isEnglish, intl }
}

export default Logic
