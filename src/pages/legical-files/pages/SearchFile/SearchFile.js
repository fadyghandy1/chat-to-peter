import { useIntl } from 'react-intl'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import SubSearch from './components/SubSearch/SubSearch'
import Logic from './logic'
import { Box, CircularProgress } from '@mui/material'
import { useRef } from 'react'
// import DeleteModal from './components/DeleteModal/DeleteModal'
import ResultsTable from './components/ResultTable/ResultsTable'

export function SearchFile() {
  const intl = useIntl()
  const { searchFileMutation, searchRef } = Logic()
  const { isLoading } = searchFileMutation

  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'SEARCHFILE.SEARCHFILE' })}>
      <Box p={4}>
        <SubSearch ref={searchRef} searchFileMutation={searchFileMutation} />

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
