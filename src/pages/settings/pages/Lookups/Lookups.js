import { useIntl } from 'react-intl'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import ParentSubForm from './Components/ParentSubForm/ParentSubForm'
import Logic from './logic'
import { CircularProgress } from '@mui/material'
import ResultsTable from './Components/ResultsTable/ResultsTable'

export function Lookups() {
  const intl = useIntl()
  const { subFormRef, getMasterLookupsMutation, lookupData, setLookupData } = Logic()
  const { isLoading } = getMasterLookupsMutation
  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'MENU.LOOKUPS' })}>
      <ParentSubForm ref={subFormRef} getMasterLookupsMutation={getMasterLookupsMutation} setLookupData={setLookupData} />
      {isLoading ? (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <CircularProgress />
        </div>
      ) : (
        <ResultsTable data={lookupData} lookupRef={subFormRef} getMasterLookupsMutation={getMasterLookupsMutation} />
      )}
    </AppLayoutPage>
  )
}
