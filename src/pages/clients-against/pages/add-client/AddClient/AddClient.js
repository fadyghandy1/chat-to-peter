import React from 'react'
import { useIntl } from 'react-intl'
import Wizard from './wizard/Wizard'
import AppLayoutPage from '../../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import { initialValues } from './constants'

const AddClient = () => {
  const intl = useIntl()
  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'ADDCLIENT.ADD_CLIENT' })}>
      <Wizard initialValues={initialValues} />
    </AppLayoutPage>
  )
}

export default AddClient
