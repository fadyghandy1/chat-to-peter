import React, { Suspense } from 'react'
import { useIntl } from 'react-intl'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import SubSearch from './components/SubSearch/SubSearch'
import Logic from './logic'
import { Box, CircularProgress } from '@mui/material'
const ResultsTable = React.lazy(() => import('./components/ResultsTable/ResultsTable'))

export function SearchClient() {
  const intl = useIntl()
  const { searchClientMutation, searchRef } = Logic()
  const { isLoading } = searchClientMutation
  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHCLIENT' })}>
      <Box p={4}>
        <SubSearch searchClientMutation={searchClientMutation} ref={searchRef} />
        {isLoading ? (
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <CircularProgress />
          </div>
        ) : (
          <ResultsTable searchRef={searchRef} />
        )}

        {/* {clientInfo?.id !== undefined && <Wizard InitialValues={InitialValueWizard} clientID={clientInfo?.id} resetClinetInfo={resetClinetInfo} mode={modes.EDIT} />} */}
      </Box>
    </AppLayoutPage>
  )
}
