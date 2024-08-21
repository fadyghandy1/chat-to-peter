import { useIntl } from 'react-intl'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import SubSearch from './components/SubSearch/SubSearch'

export function CasesReports() {
  const intl = useIntl()

  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'MENU.CASESREPORTS' })}>
      <SubSearch />
    </AppLayoutPage>
  )
}
