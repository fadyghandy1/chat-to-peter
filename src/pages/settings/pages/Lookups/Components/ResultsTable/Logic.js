import { lookupsTableColumns } from '../../constants'
import { useIntl } from 'react-intl'
import { useMemo, useState, useRef, useCallback } from 'react'
import { modes } from '../../../../../../components/common/wizard'

function Logic(lookupRef) {
  const [clientInfo, setClientInfo] = useState()
  const [expand, setExpand] = useState(true)

  // const queryClient = useQueryClient()
  const DeleteModalRef = useRef()

  const intl = useIntl()

  const editLookup = async (row) => {
    try {
      console.log(lookupRef, row)
      if (lookupRef.current) {
        lookupRef.current.setValues({ mode: modes.EDIT, nameAr: row.descriptionAr, nameEn: row.descriptionEn, id: row.id, masterCodeId: row.masterCodeId })
      }
    } catch (error) {
      // addFlashMessage({ type: 'error', message: 'eror'})
      console.log(error)
    }
  }

  const deleteLookup = (row) => {
    if (DeleteModalRef.current) DeleteModalRef.current.open(row)
  }

  const actions = {
    deleteLookup: deleteLookup,
    editLookup: editLookup,
  }

  let columns = useMemo(() => lookupsTableColumns(actions, intl), [])

  return { columns, clientInfo, DeleteModalRef, expand, setExpand }
}

export default Logic
