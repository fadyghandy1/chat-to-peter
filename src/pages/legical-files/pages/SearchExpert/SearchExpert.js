
import { useIntl } from "react-intl";
import AppLayoutPage from "../../../../layouts/AppLayoutPage/AppLayoutPage.styles";
import SubSearch from "./components/SubSearch/SubSearch";
import Logic from "./logic";
import AppTable from "../../../../components/common/AppTable/AppTable.styles";
import { Box } from "@mui/material";

export function SearchExpert() {
  const intl =useIntl()
  const {state, rows, columns} = Logic()
  return (
    <AppLayoutPage title={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHEXPERT' })}>
      <Box p={4}>
        <SubSearch/>
        {state.SearchExpertResult&& <Box mt={4}><AppTable header={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHRESULTS' })} rows={rows} columns={columns} /></Box>}
      </Box>
    </AppLayoutPage>
  )
}
