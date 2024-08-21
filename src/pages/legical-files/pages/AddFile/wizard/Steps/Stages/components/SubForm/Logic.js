import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useFormikContext } from 'formik'
import * as Yup from 'yup'
import { useIntl } from 'react-intl'
import { getListOfLawyers, getListOfAdmins, getListOfSecretaries, getAllDirectorates, getAllCaseStages, getAllCourts, getListOfAgainsts, getListOfClients, getListOfLegalConsaultants, getAllCaseTypes, getAllCaseStatus, getAllClientCharacteristic, getAllAgainstCharacteristic, getListOfExpertOffices, getListOfExperts } from '../../../../../../../../../services/LookupsServices'
import { createCaseStage, getAllStages, updateStage } from '../../../../../../../../../services/StageServices'
import UseFlashMessage from '../../../../../../../../../utils/hooks/UseFlashMessage'
import { deleteNullOrUndefinedProperties } from '../../../../../../../../../utils/common'
import useDebouncedFetch from '../../../../../../../../../utils/hooks/UseDebouncedFetch'

function Logic({ row, refetch, stageId, handleEditSuccess, editabledRow, ref }) {
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'
  const [expand, setExpand] = useState(false)
  const [clientInputValue, setClientInputValue] = useState('')
  const debouncedClientValue = useDebouncedFetch(clientInputValue, 500)
  // const [clientOptions, setClientOptions] = useState([])
  const [againstInputValue, setAgainstInputValue] = useState('')
  const debouncedAgainstValue = useDebouncedFetch(againstInputValue, 500)

  const { addFlashMessage } = UseFlashMessage()
  const formRef = useRef()
  const formikWizard = useFormikContext()
  useImperativeHandle(ref, () => ({
    sendDataToParent(expand) {
      setExpand(expand)
    },
  }))

  const initialValues = {
    clients: row?.clientIds || [],
    againsts: row?.againstIds || [],
    cosultants: row?.legalConsultantIds || [],
    pleadingLawyers: row?.lawyerIds || [],
    // administrativeTaxpayers: row?.adminIds || [],
    // secretary: row?.secretaryIds || [],
    caseStage: row?.caseStageId || null,
    caseNumber: row?.caseNumber || '',
    clientCapacity: row?.clientCharacteristicId || '',
    opponentCapacity: row?.againstCharacteristicId || '',
    directorate: row?.caseDirectorateId || '',
    expertOffice: row?.expertOfficerId || null,
    expert: row?.expertId || null,
    courtFees: row?.courtFees || '',
    court: row?.courtId || null,
    caseStatus: row?.caseStatusId || null,
    caseType: row?.caseTypeId || null,
    caseSummeryAr: row?.summaryAr || '',
    caseSummeryEn: row?.summaryEn || '',
    caseDate: row?.caseDate || null,
  }

  const validationSchema = Yup.object().shape({
    clients: Yup.array()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.CLIENTS' }) })),
    againsts: Yup.array()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.AGAINSTS' }) })),
    cosultants: Yup.array(),
    pleadingLawyers: Yup.array()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.PLEADINGLAWER' }) })),
    caseNumber: Yup.string().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    caseStage: Yup.object().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    clientCapacity: Yup.object().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    directorate: Yup.object().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    courtFees: Yup.string().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    // administrativeTaxpayers: Yup.array(),
    // secretary: Yup.array(),
  })

  const submitCaseFileMutaion = useMutation((payload) => createCaseStage(payload), {
    onSuccess: (response) => {
      setExpand(false)

      if (formRef.current) {
        formRef.current.resetForm()
      }
      refetch()
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'ADD.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.STAGE' }) }) })
    },
  })
  const submitUpdateCaseFileMutaion = useMutation(({ payload, id }) => updateStage({ payload, id }), {
    onSuccess: (response) => {
      if (formRef.current) {
        formRef.current.resetForm()
      }
      handleEditSuccess()
      // setExpand(true)

      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'EDIT.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.STAGE' }) }) })
    },
  })

  const mergeArrays = ({ selectedArray, mainArray }) => {
    const selectedIds = new Set(selectedArray.map((client) => client.id))

    // Combine unique objects from both arrays
    const mainArrayWithoutMutualIds = mainArray.filter((client) => !selectedIds.has(client.id))
    const mergedArray = [
      ...new Set([
        // ...selectedArray,
        ...selectedArray.map((client) => {
          return {
            id: client.id,
            isDeleted: false,
          }
        }),
        ...mainArrayWithoutMutualIds.map((client) => ({
          id: client.id,
          isDeleted: !selectedIds.has(client.id),
        })),
      ]),
    ]

    return mergedArray
  }

  const onSubmit = async (values) => {
    setExpand(false)

    try {
      debugger
      const selectedClientIds = values.clients.map((client) => {
        return {
          id: client.id,
        }
      })

      const selectedAgainstIds = values.againsts.map((against) => {
        return {
          id: against.id,
        }
      })

      const selectedLegalConsultantIds = values.cosultants.map((cosultant) => {
        return {
          id: cosultant.id,
        }
      })

      const selectedLawyerIds = values.pleadingLawyers.map((pleadingLawyer) => {
        return {
          id: pleadingLawyer.id,
        }
      })
      // const selectedAdminIds = values.administrativeTaxpayers.map((administrativeTaxpayer) => {
      //   return {
      //     id: administrativeTaxpayer.id,
      //   }
      // })
      // const selectedSecretaryIds = values.secretary.map((secretary) => {
      //   return {
      //     id: secretary.id,
      //   }
      // })
      let payload = {
        caseNumber: values.caseNumber,
        caseStageId: values.caseStage?.id,
        courtId: values.court?.id,
        caseDirectorateId: values.directorate?.id,
        caseTypeId: values.caseType?.id,
        caseStatusId: values.caseStatus?.id,
        clientCharacteristicId: values.clientCapacity?.id,
        againstCharacteristicId: values.opponentCapacity?.id,
        caseMasterId: formikWizard.values.fileId,
        courtFees: values.courtFees,
        caseDate: values.caseDate,
        expertOfficerId: values.expertOffice?.id,
        expertId: values.expert?.id,
        summaryAr: values.caseSummeryAr,
        summaryEn: values.caseSummeryEn,
        clientIds: selectedClientIds,
        againstIds: selectedAgainstIds,
        legalConsultantIds: selectedLegalConsultantIds,
        lawyerIds: selectedLawyerIds,
        // adminIds: selectedAdminIds,
        // secretaryIds: selectedSecretaryIds,
      }
      if (stageId) {
        const payloadForEdit = {
          ...payload,
          clientIds: mergeArrays({ mainArray: editabledRow.clientIds, selectedArray: selectedClientIds }),
          againstIds: mergeArrays({ mainArray: editabledRow.againstIds, selectedArray: selectedAgainstIds }),
          legalConsultantIds: mergeArrays({ mainArray: editabledRow.legalConsultantIds, selectedArray: selectedLegalConsultantIds }),
          lawyerIds: mergeArrays({ mainArray: editabledRow.lawyerIds, selectedArray: selectedLawyerIds }),
          // adminIds: mergeArrays({ mainArray: editabledRow.adminIds, selectedArray: selectedAdminIds }),
          // secretaryIds: mergeArrays({ mainArray: editabledRow.secretaryIds, selectedArray: selectedSecretaryIds }),
        }
        const editedPayload = { ...payloadForEdit, id: row.id }
        await submitUpdateCaseFileMutaion.mutateAsync({ payload: editedPayload, id: row.id })
      } else {
        await submitCaseFileMutaion.mutateAsync(payload)
      }
    } catch (error) {
      debugger
      console.log(error)
    }
  }

  const fetchClients = async (value) => {
    const response = await getListOfClients(value)
    return response.data.models
  }

  const fetchAgainsts = async (value) => {
    const response = await getListOfAgainsts(value)
    return response.data.models
  }

  const { data: clients = [], refetch: refetchClient } = useQuery(['clients', debouncedClientValue], () => fetchClients(debouncedClientValue), {
    enabled: !!debouncedClientValue, // Only fetch when debouncedValue is not empty
  })
  const { data: againsts = [], refetch: refetchAgainst } = useQuery(['againsts', debouncedAgainstValue], () => fetchAgainsts(debouncedAgainstValue), {
    enabled: !!debouncedAgainstValue, // Only fetch when debouncedValue is not empty
    // refetchOnMount: 'always',
  })
  useEffect(() => {
    refetchClient()
    refetchAgainst()
  }, [])

  const { data: legalConsaultants = [] } = useQuery(`legalConsaultants`, async () => {
    return await getListOfLegalConsaultants().then((res) => {
      return res.data.models
    })
  })

  const { data: listOfLawyers = [] } = useQuery(`listOfLawyers`, async () => {
    return await getListOfLawyers().then((res) => {
      return res.data.models
    })
  })

  const { data: listOfAdmins = [] } = useQuery(`listOfAdmins`, async () => {
    return await getListOfAdmins().then((res) => {
      return res.data.models
    })
  })

  const { data: listOfSecretaries = [] } = useQuery(`listOfSecretaries`, async () => {
    return await getListOfSecretaries().then((res) => {
      return res.data.models
    })
  })

  const { data: caseStages = [] } = useQuery(`caseStages`, async () => {
    return await getAllCaseStages().then((res) => {
      return res.data.models
    })
  })

  const { data: courts = [] } = useQuery(`courts`, async () => {
    return await getAllCourts().then((res) => {
      return res.data.models
    })
  })

  const { data: directorates = [] } = useQuery(`directorates`, async () => {
    return await getAllDirectorates().then((res) => {
      return res.data.models
    })
  })

  const { data: caseTypes = [] } = useQuery(`caseTypes`, async () => {
    return await getAllCaseTypes().then((res) => {
      return res.data.models
    })
  })

  const { data: caseStatuses = [] } = useQuery(`caseStatuses`, async () => {
    return await getAllCaseStatus().then((res) => {
      return res.data.models
    })
  })

  const { data: clientCharacteristic = [] } = useQuery(`clientCharacteristic`, async () => {
    return await getAllClientCharacteristic().then((res) => {
      return res.data.models
    })
  })

  const { data: againstCharacteristic = [] } = useQuery(`againstCharacteristic`, async () => {
    return await getAllAgainstCharacteristic().then((res) => {
      return res.data.models
    })
  })

  const { data: expertOffices = [] } = useQuery(`expertOffices`, async () => {
    return await getListOfExpertOffices().then((res) => {
      return res.data.models
    })
  })

  const { data: experts = [] } = useQuery(`experts`, async () => {
    return await getListOfExperts().then((res) => {
      return res.data.models
    })
  })

  return { initialValues, onSubmit, clients, legalConsaultants, listOfLawyers, againsts, listOfAdmins, listOfSecretaries, directorates, caseStages, caseTypes, expertOffices, experts, courts, caseStatuses, clientCharacteristic, againstCharacteristic, submitCaseFileMutaion, formRef, validationSchema, expand, setExpand, setClientInputValue, setAgainstInputValue, isEnglish, intl }
}

export default Logic
