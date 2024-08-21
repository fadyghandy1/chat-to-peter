import { searchTableColumns } from '../../constants'
import { useIntl } from 'react-intl'
import { useMemo, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { getOpponent } from '../../../../../../services/OpponentServices'
import { handleBase64ToPreview } from '../../../../../../utils/common'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

function Logic(searchRef) {
  const intl = useIntl()
  const [opponentInfo, setOpponentInfo] = useState()
  const [expand, setExpand] = useState(true)
  // const queryClient = useQueryClient()
  // const state = queryClient.getQueryState({ queryKey: 'todos' })
  const state = useSelector((state) => {
    const { SearchAgainstResult } = state.SearchAgainst
    return { SearchAgainstResult }
  }, shallowEqual)

  const DeleteModalRef = useRef()
  const getOpponentMutation = useMutation((payload) => getOpponent(payload), {
    onSuccess: (response) => {
      const data = response.data.model

      setOpponentInfo(data)
    },
    onError: (err) => {
      setOpponentInfo()
    },
    // onSettled: () => {
    //   setIsLoading(false)
    // },
  })
  const editOpponent = async (row) => {
    try {
      setExpand(false)
      await getOpponentMutation.mutateAsync(row.id)
    } catch (error) {
      // addFlashMessage({ type: 'error', message: 'eror'})
      console.log(error)
    }
  }
  const deleteOpponent = (row) => {
    if (DeleteModalRef.current) DeleteModalRef.current.open(row.id)
  }

  const viewOpponent = (row, index) => {}
  const actions = {
    deleteOpponent: deleteOpponent,
    editOpponent: editOpponent,
    viewOpponent: viewOpponent,
  }

  let columns = useMemo(() => searchTableColumns(actions, intl), [])
  const handleOnUpdated = async (newData) => {
    // againstDTO
    if (searchRef.current) searchRef.current.submitForm()

    setOpponentInfo()
  }
  const initialValues = {
    nameAr: opponentInfo?.nameAr || '',
    nameEn: opponentInfo?.nameEn || '',
    mobile: opponentInfo?.mobileNumber || '',
    telephone: opponentInfo?.phoneNumber || '',
    email: opponentInfo?.email || '',
    passport: opponentInfo?.passportNumber || '',
    postCode: opponentInfo?.postalCode || '',
    nationality: opponentInfo?.nationalityId || null,
    city: opponentInfo?.cityId || null,
    fax: opponentInfo?.fax || '',
    street: opponentInfo?.street || '',
    apartment: opponentInfo?.apartmentNumber || '',
    buildingNu: opponentInfo?.buildingNumber || '',
    reference: opponentInfo?.reference || '',
    clientType: opponentInfo?.clientTypeId || null,
    address: opponentInfo?.address || '',
    localIdentificationNumber: opponentInfo?.localIdentificationNumber || '',
    attachments:
      opponentInfo?.againstDoucuments?.map((doc) => {
        return {
          ...doc,
          attachmentType: doc.document?.attachmentType,
          attachmentIssuedDate: doc.document?.issuedDate,
          attachmentEndDate: doc.document?.expiryDate,
          attachmentName: doc.document?.name,
          attachment: handleBase64ToPreview({ extension: doc.document?.extension, base64: doc.document?.file }),
          // attachmentNameOfTypeAR: doc.document?.nameOfTypeAR,
        }
      }) || [],
    lawyers: opponentInfo?.lawyers || [],
  }
  return { columns, initialValues, opponentInfo, getOpponentMutation, DeleteModalRef, handleOnUpdated, state, expand, setExpand }
}

export default Logic
