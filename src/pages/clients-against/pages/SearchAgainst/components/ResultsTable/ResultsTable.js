import { useIntl } from 'react-intl'
import Logic from './Logic'
import React, { useRef } from 'react'
import AppTable from '../../../../../../components/common/AppTable/AppTable.styles'
import ConfirmationDialog from '../../../../../../components/common/ConfirmationDialog/ConfirmationDialog.styles'
import { Box, CircularProgress } from '@mui/material'
import Wizard from '../../../AddAgainst/wizard/Wizard'
import { modes } from '../../../../../../components/common/wizard'
import { useQueryClient } from 'react-query'
import DeleteModal from '../DeleteModal/DeleteModal'
import CollapsiblePanel from '../../../../../../components/common/CollapsiblePanel/CollapsiblePanel.styles'

function ResultsTable({ searchRef }) {
  const { columns, initialValues, opponentInfo, getOpponentMutation, DeleteModalRef, handleOnUpdated, state, expand, setExpand } = Logic(searchRef)
  const intl = useIntl()
  const { isLoading } = getOpponentMutation

  return (
    <>
      {state.SearchAgainstResult.length > 0 && (
        <CollapsiblePanel title={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHRESULTS' })} expanded={expand} onClick={() => setExpand((prevState) => !prevState)}>
          <Box mt={4}>
            <AppTable rows={state.SearchAgainstResult} columns={columns} />
          </Box>
        </CollapsiblePanel>
      )}
      {isLoading ? (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <CircularProgress />
        </div>
      ) : (
        opponentInfo && (
          <Wizard
            initialValues={initialValues}
            mode={modes.EDIT}
            againstId={opponentInfo?.id}
            handleOnUpdated={handleOnUpdated}
            // searchOpponent={searchOpponentMutation}
          />
        )
      )}
      <DeleteModal ref={DeleteModalRef} searchRef={searchRef} />
    </>
  )
}

export default ResultsTable
