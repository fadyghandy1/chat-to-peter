import { useIntl } from 'react-intl'
import Logic from './Logic'
import React from 'react'
import AppTable from '../../../../../../components/common/AppTable/AppTable.styles'
import DeleteModal from '../DeleteModal/DeleteModal'
import { Box, CircularProgress } from '@mui/material'
// import Wizard from '../../../AddClient/wizard/Wizard'
// import { modes } from '../../../../../../components/common/wizard'
import CollapsiblePanel from '../../../../../../components/common/CollapsiblePanel/CollapsiblePanel.styles'
import SubForm from '../../../AddTimesheet/components/SubForm/SubForm'
import { modes } from '../../../../../../components/common/wizard'

function ResultsTable({ searchRef }) {
  const { columns, initialValues, timesheet, getTimesheetMutation, DeleteModalRef, state, expand, setExpand, handleOnUpdated } = Logic(searchRef)
  const intl = useIntl()
  const { isLoading } = getTimesheetMutation

  return (
    <>
      {state && state.SearchTimesheetResult.length > 0 && (
        <CollapsiblePanel title={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHRESULTS' })} expanded={expand} onClick={() => setExpand((prevState) => !prevState)}>
          <Box mt={4}>
            <AppTable header={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHRESULTS' })} rows={state.SearchTimesheetResult} columns={columns} />
          </Box>
        </CollapsiblePanel>
      )}

      {isLoading ? (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <CircularProgress />
        </div>
      ) : (
        timesheet && <SubForm initialValues={initialValues} mode={modes.EDIT} timesheetId={timesheet?.taskId} handleOnUpdated={handleOnUpdated} />
      )}

      <DeleteModal ref={DeleteModalRef} searchRef={searchRef} />
    </>
  )
}

export default React.memo(ResultsTable)
