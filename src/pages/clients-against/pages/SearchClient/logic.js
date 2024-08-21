import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { searchClient } from '../../../../services/ClientServices'
import UseFlashMessage from '../../../../utils/hooks/UseFlashMessage'
import { useDispatch } from 'react-redux'
import { SearchClientSlice } from './SearchClientSlice'
import { useEffect } from 'react'
import UseSliceReset from '../../../../utils/hooks/UseSliceReset'
import { useIntl } from 'react-intl'

function Logic() {
  UseSliceReset(SearchClientSlice)

  const { addFlashMessage } = UseFlashMessage()
  const searchRef = useRef()
  const dispatch = useDispatch()
  const { update } = SearchClientSlice.actions
  const intl = useIntl()

  const searchClientMutation = useMutation((payload) => searchClient(payload), {
    onSuccess: (response) => {
      debugger
      if (response.data.models) {
        dispatch(
          update([
            {
              prop: 'SearchClientResult',
              value: response.data.models,
            },
          ])
        )
      }
      if (response.data.models.length === 0) {
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
            prop: 'SearchClientResult',
            value: [],
          },
        ])
      )
    },
  })

  return { searchClientMutation, searchRef }
}

export default Logic
