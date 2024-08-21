import { useIntl } from 'react-intl'
import Logic from './Logic'
import React, { useEffect } from 'react'
import AppTable from '../../../../../../components/common/AppTable/AppTable.styles'
import DeleteModal from '../DeleteModal/DeleteModal'
import { Box } from '@mui/material'
import CollapsiblePanel from '../../../../../../components/common/CollapsiblePanel/CollapsiblePanel.styles'

function ResultsTable({ data, getMasterLookupsMutation, lookupRef }) {
  const { columns, state, expand, setExpand, DeleteModalRef } = Logic(lookupRef)
  const intl = useIntl()
  return (
    <>
      {data?.length > 0 && (
        <CollapsiblePanel
          title={intl.formatMessage({ id: 'SEARCHCLIENT.SEARCHRESULTS' })}
          expanded={expand}
          onClick={() => setExpand((prevState) => !prevState)}
          sx={{ padding: 2, width: '98%', mx: 'auto' }} // Adjust padding and width
        >
          <Box mt={4}>
            <AppTable rows={data} columns={columns} />
          </Box>
        </CollapsiblePanel>
      )}

      {<DeleteModal ref={DeleteModalRef} getMasterLookupsMutation={getMasterLookupsMutation} />}
    </>
  )
}

export default React.memo(ResultsTable)
