import { useMutation, useQuery } from 'react-query'
import { useIntl } from 'react-intl'
import { addLookups, getMasterLookups, updateLookups } from '../../../../../../services/LookupsServices'
import { QUERY_KEY } from '../../../../../../utils/constants/static'
import { modes } from '../../../../../../components/common/wizard'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
import * as Yup from 'yup'

function Logic({ getMasterLookupsMutation, setLookupData }) {
  const { addFlashMessage } = UseFlashMessage()
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'

  const InitialValueSearch = {
    masterCodeId: '',
    nameAr: '',
    nameEn: '',
    id: '',
    mode: modes.ADD,
  }
  const generateUserName = (name) => {
    const formattedName = name.replace(/\s/g, '_')

    return `${formattedName}`
  }

  const validationSchema = Yup.object().shape({
    nameAr: Yup.string().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    nameEn: Yup.string().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
  })

  const { data: lookups = [] } = useQuery(QUERY_KEY['GET-ALL-LOOKUPS'], async () => {
    return await getMasterLookups().then((res) => {
      return res.data.models
    })
  })
  const fetchLookupData = async (payload) => {
    try {
      await getMasterLookupsMutation.mutateAsync(payload)
    } catch (error) {
      console.log(error)
    }
  }
  const addLookupMutation = useMutation((payload) => addLookups(payload), {
    onSuccess: (response) => {
      addFlashMessage({
        type: 'success',
        message: intl.formatMessage({ id: 'ADD.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'MENU.LOOKUPS' }) }),
      })
    },
    onError: () => {},
  })
  const editLookupMutaion = useMutation((payload) => updateLookups(payload), {
    onSuccess: (response) => {
      // queryClient.setQueryData('todos', response.data)
      addFlashMessage({
        type: 'success',
        message: intl.formatMessage({ id: 'EDIT.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'MENU.LOOKUPS' }) }),
      })
    },
    onError: () => {},
  })
  const onSubmit = async (values, { setValues }) => {
    try {
      let createResponse, editResponse
      const payload = {
        masterCodeId: values.masterCodeId.id,
        descriptionAr: values.nameAr,
        descriptionEn: values.nameEn,
      }
      if (values.mode === modes.ADD) {
        createResponse = await addLookupMutation.mutateAsync(payload)
      } else {
        editResponse = await editLookupMutaion.mutateAsync({ ...payload, id: values.id })
      }
      if (createResponse?.status === 200 || editResponse?.status === 200) {
        fetchLookupData(values.masterCodeId.id)
        setValues({
          masterCodeId: values.masterCodeId.id,
          mode: modes.ADD,
          nameAr: '',
          nameEn: '',
          id: '',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnChangeLookup = (e, setFieldValue) => {
    if (e !== null) {
      fetchLookupData(e?.id)
    } else {
      setLookupData([])
    }
    setFieldValue('mode', modes.ADD)
    setFieldValue('nameAr', '')
    setFieldValue('nameEn', '')
    setFieldValue('id', '')
  }
  return { onSubmit, InitialValueSearch, lookups, handleOnChangeLookup, addLookupMutation, editLookupMutaion, isEnglish, intl, validationSchema, generateUserName }
}

export default Logic
