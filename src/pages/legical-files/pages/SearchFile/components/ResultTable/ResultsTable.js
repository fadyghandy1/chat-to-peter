import { useIntl } from 'react-intl'
import Logic from './Logic'
import React from 'react'
import AppTable from '../../../../../../components/common/AppTable/AppTable.styles'
// import DeleteModal from '../DeleteModal/DeleteModal'
import { Box, CircularProgress } from '@mui/material'
// import Wizard from '../../../add-client/AddClient/wizard/Wizard'
// import { modes } from '../../../../../../components/common/wizard'
import CollapsiblePanel from '../../../../../../components/common/CollapsiblePanel/CollapsiblePanel.styles'

function ResultsTable({ searchRef }) {
  const { columns, state, expand, setExpand } = Logic(searchRef)
  const intl = useIntl()
  //   const { isLoading } = getClientMutation
  console.log(state.SearchFileResult)
  return (
    <>
      {state.SearchFileResult.length > 0 && (
        <CollapsiblePanel title={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHRESULTS' })} expanded={expand} onClick={() => setExpand((prevState) => !prevState)}>
          <Box mt={4}>
            <AppTable rows={state.SearchFileResult} columns={columns} />
          </Box>
        </CollapsiblePanel>
      )}
      {/* {isLoading ? (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <CircularProgress />
        </div>
      ) : (
        clientInfo && (
          <Wizard
            initialValues={initialValues}
            mode={modes.EDIT}
            clientID={clientInfo?.id}
            handleOnUpdated={handleOnUpdated}
            // searchOpponent={searchOpponentMutation}
          />
        )
      )} */}

      {/* <DeleteModal ref={DeleteModalRef} searchRef={searchRef} /> */}
    </>
  )
}

export default React.memo(ResultsTable)
