import { useIntl } from 'react-intl'
import AppLayoutPage from '../../../../layouts/AppLayoutPage/AppLayoutPage.styles'
import SubSearch from './SubSearch/SubSearch'
import { Box } from '@mui/material'

export function AddUser() {
  const intl = useIntl()

  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHAGAINST' })}>
      <Box p={4}>
        <SubSearch />
      </Box>
    </AppLayoutPage>
  )
}
