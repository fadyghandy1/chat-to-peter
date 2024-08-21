import { useIntl } from 'react-intl'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import SubSearch from './components/SubSearch/SubSearch'
import Logic from './logic'
import { Box, CircularProgress } from '@mui/material'
import ResultsTable from './components/ResultsTable/ResultsTable'

export function SearchTimesheet() {
  const intl = useIntl()

  const { searchTimesheetMutation, searchRef } = Logic()
  const { isLoading } = searchTimesheetMutation

  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'SEARCHTIMESHEET.SEARCHTIMESHEET' })}>
      <Box p={4}>
        <SubSearch searchTimesheetMutation={searchTimesheetMutation} ref={searchRef} />

        {isLoading ? (
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <CircularProgress />
          </div>
        ) : (
          <ResultsTable searchRef={searchRef} />
        )}
      </Box>
    </AppLayoutPage>
  )
}
