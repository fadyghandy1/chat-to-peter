import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { useRef, useState } from 'react'
import { getMasterLookupsDetails } from '../../../../services/LookupsServices'
import UseFlashMessage from '../../../../utils/hooks/UseFlashMessage'

function Logic() {
  const intl = useIntl()
  const { addFlashMessage } = UseFlashMessage()

  const subFormRef = useRef()
  const [lookupData, setLookupData] = useState([])

  const getMasterLookupsMutation = useMutation((payload) => getMasterLookupsDetails(payload), {
    onSuccess: (response) => {
      // queryClient.setQueryData('todos', response.data)
      debugger
      if (response.data.models) {
        setLookupData(response.data.models)
      }
      if (response.data.models === null) {
        addFlashMessage({
          type: 'warning',
          message: intl.formatMessage({ id: 'WARNING.NORESULT' }),
        })
      }
    },
    onError: () => {
      setLookupData([])
    },
  })

  return { subFormRef, getMasterLookupsMutation, lookupData, setLookupData }
}

export default Logic
