import { useIntl } from 'react-intl'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import Wizard from './wizard/Wizard'

export function AddConsultant() {
  const intl = useIntl()
  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'ADDCONSULT.ADDCONSULTANT' })}>
      <Wizard />
    </AppLayoutPage>
  )
}
