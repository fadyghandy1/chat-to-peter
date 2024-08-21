import React, { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'
import { getImageType } from '../../../../../../../../../services/LookupsServices'
import { QUERY_KEY } from '../../../../../../../../../utils/constants/static'
import { useIntl } from 'react-intl'
import { getImageTypeFromBase64 } from '../../../../../../../../../utils/common'
import { maxFilesSizes, supportedFilesFormat } from '../../../../../../../../../utils/constants/config'

function Logic(row, setAttachments) {
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'

  const initialValues = {
    attachmentType: row?.attachmentType || null,
    attachmentEndDate: row?.attachmentEndDate || '',
    attachmentIssuedDate: row?.attachmentIssuedDate || '',
    attachmentName: row?.attachmentName || '',
    attachment: row?.attachment || '',
  }

  const validationSchema = Yup.object().shape({
    attachment: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .test('is-filetype', intl.formatMessage({ id: 'VALIDATION.FILETYPE' }), function (value) {
        console.log(value)
        const extension = getImageTypeFromBase64(value)

        return extension && supportedFilesFormat.includes(extension)
      })
      .test('fileSize', intl.formatMessage({ id: 'VALIDATION.FILESIZE' }) + maxFilesSizes / (1024 * 1024) + ' MB', (value) => (value?.size > 0 ? value.size : value?.replace(/=/g, '').length * 0.75) < maxFilesSizes),

    attachmentType: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    attachmentName: Yup.string()
      .trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .strict(true)
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    attachmentIssuedDate: Yup.date(),
    attachmentEndDate: Yup.date().test('is-after-issuedDate', intl.formatMessage({ id: 'VALIDATION.ENDDATE' }, { fieldname1: intl.formatMessage({ id: 'ADDFILE.EXPIRYDATE' }), fieldname2: intl.formatMessage({ id: 'ADDFILE.ISSUEDDATE' }) }), function (value) {
      const { attachmentIssuedDate } = this.parent
      if (!attachmentIssuedDate) {
        return true
      }
      return value && new Date(value) > new Date(attachmentIssuedDate)
    }),
  })

  const onSubmit = (values, { resetForm }) => {
    debugger
    setAttachments(values)
    resetForm()
  }

  const { data: attachmentTypes = [] } = useQuery(QUERY_KEY.imageType, async () => {
    return await getImageType().then((res) => {
      return res.data.data.models
    })
  })

  return { initialValues, onSubmit, attachmentTypes, validationSchema, isEnglish, intl }
}

export default Logic
