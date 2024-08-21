import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useMutation, useQuery } from 'react-query'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
import * as Yup from 'yup'
import { QUERY_KEY } from '../../../../../../utils/constants/static'
import { getImageTypeFromBase64 } from '../../../../../../utils/common'
import { maxFilesSizes } from '../../../../../../utils/constants/config'

function Logic() {
  const intl = useIntl()
  const { addFlashMessage } = UseFlashMessage()
  const supportedFilesFormat = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/webp']

  const onSubmit = async (values, { resetForm }) => {}

  const validationSchema = Yup.object().shape({
    logoImage: Yup.mixed()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .test('fileSize', intl.formatMessage({ id: 'VALIDATION.FILESIZE' }) + maxFilesSizes / (1024 * 1024) + ' MB', (value) => (value?.size > 0 ? value.size : value?.replace(/=/g, '').length * 0.75) < maxFilesSizes)
      .test('is-filetype', intl.formatMessage({ id: 'VALIDATION.FILETYPE' }), function (value) {
        const extension = getImageTypeFromBase64(value)

        return extension && supportedFilesFormat.includes(extension)
      }),
    iconImage: Yup.mixed()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .test('fileSize', intl.formatMessage({ id: 'VALIDATION.FILESIZE' }) + maxFilesSizes / (1024 * 1024) + ' MB', (value) => (value?.size > 0 ? value.size : value?.replace(/=/g, '').length * 0.75) < maxFilesSizes)
      .test('is-filetype', intl.formatMessage({ id: 'VALIDATION.FILETYPE' }), function (value) {
        const extension = getImageTypeFromBase64(value)

        return extension && supportedFilesFormat.includes(extension)
      }),
  })
  return { intl, onSubmit, validationSchema }
}

export default Logic
