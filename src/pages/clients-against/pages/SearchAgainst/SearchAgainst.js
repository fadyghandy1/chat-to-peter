import { useIntl } from 'react-intl'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import SubSearch from './components/SubSearch/SubSearch'
import Logic from './logic'
import { Box, CircularProgress } from '@mui/material'
import DeleteModal from './components/DeleteModal/DeleteModal'
import ResultsTable from './components/ResultsTable/ResultsTable'

export function SearchAgainst() {
  const intl = useIntl()

  const { searchOpponentMutation, searchRef } = Logic()
  const { isLoading } = searchOpponentMutation

  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHAGAINST' })}>
      <Box p={4}>
        <SubSearch searchOpponentMutation={searchOpponentMutation} ref={searchRef} />

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
