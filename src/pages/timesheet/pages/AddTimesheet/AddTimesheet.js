import React from 'react'
import { Box } from '@mui/material'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import Logic from './Logic'
import SubForm from './components/SubForm/SubForm'
import { initialValues } from './constants'

export function AddTimesheet() {
  const { intl } = Logic()
  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'MENU.ADDTIMESHEET' })}>
      <Box p={4}>
        <SubForm initialValues={initialValues} />
      </Box>
    </AppLayoutPage>
  )
}
