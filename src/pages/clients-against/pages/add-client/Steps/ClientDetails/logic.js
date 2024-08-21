import { useQuery } from 'react-query'
import { useIntl } from 'react-intl'
import { getBranch, getClientType, getCompany, getNationality } from '../../../../../../services/LookupsServices'
import { useState } from 'react'
import useDebouncedFetch from '../../../../../../utils/hooks/UseDebouncedFetch'
import { searchOpponentName } from '../../../../../../services/OpponentServices'

const Logic = ({ setFieldValue, corporate }) => {
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'
  const [clientNameArInputValue, setClientArInputValue] = useState('')
  const debouncedClientNameArValue = useDebouncedFetch(clientNameArInputValue, 500)
  const [clientNameEnInputValue, setClientNameEnInputValue] = useState('')
  const debouncedClientNameEnValue = useDebouncedFetch(clientNameEnInputValue, 500)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogField, setDialogField] = useState('')

  const fetchClientName = async ({ value, field }) => {
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

  const { data: clientArResponse } = useQuery(['clientArName', debouncedClientNameArValue], () => fetchClientName({ value: debouncedClientNameArValue, field: 'existClientNameAr' }), {
    enabled: !!debouncedClientNameArValue, // Only fetch when debouncedValue is not empty
  })

  const { data: clientEnResponse } = useQuery(['clientEnName', debouncedClientNameEnValue], () => fetchClientName({ value: debouncedClientNameEnValue, field: 'existClientNameEn' }), {
    enabled: !!debouncedClientNameEnValue, // Only fetch when debouncedValue is not empty
  })
  const { data: companies = [] } = useQuery(
    'companies',
    async () => {
      const res = await getCompany()
      return res.data.data.models
    },
    {
      enabled: corporate,
    }
  )
  const { data: branches = [] } = useQuery(`branches`, async () => {
    return await getBranch().then((res) => {
      return res.data.data.models
    })
  })
  const { data: clientType = [] } = useQuery(`clientType`, async () => {
    return await getClientType().then((res) => {
      return res.data.data.models
    })
  })

  const { data: nationalities = [] } = useQuery(`nationalities`, async () => {
    return await getNationality().then((res) => {
      return res.data.data.models
    })
  })

  const generateUserName = (name) => {
    const formattedName = name.replace(/\s/g, '_')
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear().toString().slice(-2)
    const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0')
    const currentSeconds = currentDate.getSeconds().toString().padStart(2, '0')

    return `${formattedName}_${currentYear}${currentMinutes}${currentSeconds}`
  }
  return { clientType, nationalities, companies, generateUserName, intl, isEnglish, branches, setClientArInputValue, setClientNameEnInputValue, handleConfirm, handleCancel, showDialog }
}
export default Logic
