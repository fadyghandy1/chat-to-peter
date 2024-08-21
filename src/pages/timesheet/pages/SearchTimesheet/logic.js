import { useRef } from 'react'
import { useMutation } from 'react-query'
import { searchTimeSheet } from '../../../../services/TimeSheetServices'
import UseFlashMessage from '../../../../utils/hooks/UseFlashMessage'
import { useDispatch } from 'react-redux'
import { SearchTimesheetSlice } from './SearchTimesheetSlice'
import UseSliceReset from '../../../../utils/hooks/UseSliceReset'
import { useIntl } from 'react-intl'

function Logic() {
  UseSliceReset(SearchTimesheetSlice)
  const { addFlashMessage } = UseFlashMessage()
  const searchRef = useRef()
  const dispatch = useDispatch()
  const { update } = SearchTimesheetSlice.actions
  const intl = useIntl()

  const searchTimesheetMutation = useMutation((payload) => searchTimeSheet(payload), {
    onSuccess: (response) => {
      debugger

      dispatch(
        update([
          {
            prop: 'SearchTimesheetResult',
            value: response.data.models,
          },
        ])
      )
      if (response.data?.models && response.data?.models?.length <= 0) {
        addFlashMessage({
          type: 'warning',
          message: intl.formatMessage({ id: 'WARNING.NORESULT' }),
        })
      }
    },
  })

  return { searchTimesheetMutation, searchRef }
}

export default Logic
