import React from 'react'
import { useIntl } from 'react-intl'
import Wizard from './wizard/Wizard'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'

const AddClient = () => {
  const intl =useIntl()
  return (
    <AppLayoutPage title={intl.formatMessage({id: 'ADDEXPERT.ADD_EXPERT'})}>
      <Wizard />
    </AppLayoutPage>
  )
}

export default AddClient
