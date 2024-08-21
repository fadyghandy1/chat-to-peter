import { useMutation, useQueryClient } from 'react-query'
import { searchFile } from '../../../../services/FilesServices'
import UseFlashMessage from '../../../../utils/hooks/UseFlashMessage'
import { useDispatch } from 'react-redux'
import { SearchFileSlice } from './SearchFileSlice'
import UseSliceReset from '../../../../utils/hooks/UseSliceReset'
import { useRef } from 'react'
import { useIntl } from 'react-intl'

function Logic() {
  UseSliceReset(SearchFileSlice)
  const { addFlashMessage } = UseFlashMessage()
  const dispatch = useDispatch()
  const { update } = SearchFileSlice.actions
  const searchRef = useRef()
  const intl = useIntl()

  const searchFileMutation = useMutation((payload) => searchFile(payload), {
    onSuccess: (response) => {
      // queryClient.setQueryData('todos', response.data)
      debugger
      if (response.data.model) {
        dispatch(
          update([
            {
              prop: 'SearchFileResult',
              value: response.data.model,
            },
          ])
        )
      }
      if (response.data.model.length === 0) {
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
            prop: 'SearchFileResult',
            value: [],
          },
        ])
      )
    },
  })

  return { searchFileMutation, searchRef }
}

export default Logic
