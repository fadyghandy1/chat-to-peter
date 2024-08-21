import React from 'react'
import { useIntl } from 'react-intl'
import Wizard from './wizard/Wizard'
import AppLayoutPage from '../../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import { initialValues } from './constants'

const AddClientCorporate = () => {
  const intl = useIntl()
  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'ADD.COPRORATE' })}>
      <Wizard initialValues={initialValues} />
    </AppLayoutPage>
  )
}

export default AddClientCorporate
