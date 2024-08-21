import React from 'react'
import { useIntl } from 'react-intl'
import { initialValues } from './constants'
import Wizard from './wizard/Wizard'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'

const AddOpponent = () => {
  const intl = useIntl()
  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'ADDOPPONENT.ADD_OPPONENT' })}>
      <Wizard initialValues={initialValues} />
    </AppLayoutPage>
  )
}

export default AddOpponent
