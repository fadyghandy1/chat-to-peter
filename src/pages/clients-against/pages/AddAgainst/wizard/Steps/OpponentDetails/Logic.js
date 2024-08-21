import { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useIntl } from 'react-intl'
import { getNationality, getCity, getGender, getClientType } from '../../../../../../../services/LookupsServices'
import { QUERY_KEY } from '../../../../../../../utils/constants/static'
import useDebouncedFetch from '../../../../../../../utils/hooks/UseDebouncedFetch'
import { searchOpponentName } from '../../../../../../../services/OpponentServices'

const Logic = ({ setFieldValue }) => {
  const intl = useIntl()
  const formRef = useRef()
  const locale = intl.locale
  const isEnglish = locale === 'en'
  const [againstNameArInputValue, setAgainstNameArInputValue] = useState('')
  const debouncedAgainstNameArValue = useDebouncedFetch(againstNameArInputValue, 500)
  const [againstNameEnInputValue, setAgainstNameEnInputValue] = useState('')
  const debouncedAgainstNameEnValue = useDebouncedFetch(againstNameEnInputValue, 500)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogField, setDialogField] = useState('')

  const fetchAgainstName = async ({ value, field }) => {
    try {
      const response = await searchOpponentName(value)
      setFieldValue(field, response.data.model)

      if (response.data.model) {
        setDialogField(field)
        // addFlashMessage({ type: 'error', message: intl.formatMessage({ id: 'Validation.NAME.EXIST' }) })
        setShowDialog(true)
      }
    } catch (e) {
      debugger
      console.log(e)
    }
  }
  const handleConfirm = () => {
    setFieldValue(dialogField, false)
    setShowDialog(false)
  }
  const handleCancel = () => {
    setFieldValue(dialogField, true)
    setShowDialog(false)
  }

  const { data: againstArResponse } = useQuery(['againstArName', debouncedAgainstNameArValue], () => fetchAgainstName({ value: debouncedAgainstNameArValue, field: 'existNameAr' }), {
    enabled: !!debouncedAgainstNameArValue, // Only fetch when debouncedValue is not empty
  })

  const { data: againstEnResponse } = useQuery(['againstEnName', debouncedAgainstNameEnValue], () => fetchAgainstName({ value: debouncedAgainstNameEnValue, field: 'existNameEn' }), {
    enabled: !!debouncedAgainstNameEnValue, // Only fetch when debouncedValue is not empty
  })

  const { data: cities = [] } = useQuery(QUERY_KEY.cities, async () => {
    return await getCity().then((res) => {
      return res.data.data.models
    })
  })

  const { data: nationalities = [] } = useQuery(QUERY_KEY.nationalities, async () => {
    return await getNationality().then((res) => {
      return res.data.data.models
    })
  })

  const { data: clientTypes = [] } = useQuery(QUERY_KEY.clientTypes, async () => {
    return await getClientType().then((res) => {
      return res.data.data.models
    })
  })

  return { cities, nationalities, clientTypes, handleConfirm, handleCancel, setAgainstNameArInputValue, setAgainstNameEnInputValue, againstArResponse, againstEnResponse, formRef, intl, isEnglish, showDialog, setShowDialog }
}

export default Logic
