import { useMutation, useQueryClient } from 'react-query'
import { searchOpponent } from '../../../../services/OpponentServices'
import UseFlashMessage from '../../../../utils/hooks/UseFlashMessage'
import { useDispatch } from 'react-redux'
import { SearchAgainstSlice } from './SearchAgainstSlice'
import UseSliceReset from '../../../../utils/hooks/UseSliceReset'
import { useRef } from 'react'
import { useIntl } from 'react-intl'

function Logic() {
  UseSliceReset(SearchAgainstSlice)
  const { addFlashMessage } = UseFlashMessage()
  const dispatch = useDispatch()
  const { update } = SearchAgainstSlice.actions
  const searchRef = useRef()
  const intl = useIntl()

  const searchOpponentMutation = useMutation((payload) => searchOpponent(payload), {
    onSuccess: (response) => {
      // queryClient.setQueryData('todos', response.data)
      debugger
      if (response.data.models) {
        dispatch(
          update([
            {
              prop: 'SearchAgainstResult',
              value: response.data.models,
            },
          ])
        )
      }
      if (response.data.models === null) {
        addFlashMessage({
          type: 'warning',
          message: intl.formatMessage({ id: 'WARNING.NORESULT' }),
        })
      }
    },
    onError: () => {
      dispatch(
        update([
          {
            prop: 'SearchAgainstResult',
            value: [],
          },
        ])
      )
    },
  })

  return { searchOpponentMutation, searchRef }
}

export default Logic
