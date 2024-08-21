import { useMutation, useQuery } from 'react-query'
import { getAllStages } from '../../../../../../../../../services/StageServices'
import { getHearingType, getListOfAdmins, getListOfLawyers, getListOfLegalConsaultants, getListOfSecretaries } from '../../../../../../../../../services/LookupsServices'
import { addHearing, editHearing } from '../../../../../../../../../services/HearingServices'
import { useIntl } from 'react-intl'
import UseFlashMessage from '../../../../../../../../../utils/hooks/UseFlashMessage'
import { useImperativeHandle, useRef, useState } from 'react'
import * as Yup from 'yup'
import { useFormikContext } from 'formik'
import { QUERY_KEY } from '../../../../../../../../../utils/constants/static'

function Logic(row, refetch, hearingId, handleEditSuccess, ref) {
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'
  const { addFlashMessage } = UseFlashMessage()
  const formRef = useRef()
  const formikWizard = useFormikContext()
  const [expand, setExpand] = useState(false)

  useImperativeHandle(ref, () => ({
    sendDataToParent(expand) {
      setExpand(expand)
    },
  }))

  const { data: casesNumbers = [] } = useQuery(QUERY_KEY['ADDFILE-CASESNUMBER'], async () => {
    return await getAllStages({ caseMasterId: formikWizard.values.fileId }).then((res) => {
      return res.data.models || []
    })
  })
  const { data: hearingTypes = [] } = useQuery(QUERY_KEY['ADDFILE-HEARINGTYPES'], async () => {
    return await getHearingType().then((res) => {
      return res.data?.data?.models
    })
  })
  const { data: cosultants = [] } = useQuery(QUERY_KEY['ADDFILE-CONSULTANTS'], async () => {
    return await getListOfLegalConsaultants().then((res) => {
      return res.data.models
    })
  })
  const { data: pleadingLawyers = [] } = useQuery(QUERY_KEY['ADDFILE-LAWYERS'], async () => {
    return await getListOfLawyers().then((res) => {
      return res.data.models
    })
  })
  const { data: administrativeTaxpayers = [] } = useQuery(QUERY_KEY['ADDFILE-ADMINS'], async () => {
    return await getListOfAdmins().then((res) => {
      return res.data.models
    })
  })
  const { data: secretaryList = [] } = useQuery(QUERY_KEY['ADDFILE-SECRETARYLIST'], async () => {
    return await getListOfSecretaries().then((res) => {
      return res.data.models
    })
  })
  const addHearingMutation = useMutation((credentials) => addHearing(credentials), {
    onSuccess: (response) => {
      if (formRef.current) {
        formRef.current.resetForm()
      }
      refetch()
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'ADD.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.HEARING' }) }) })
    },
  })
  const editHearingMutation = useMutation(({ payload, hearingId }) => editHearing(payload, hearingId), {
    onSuccess: (response) => {
      setExpand(true)

      if (formRef.current) {
        formRef.current.resetForm()
      }
      handleEditSuccess()
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'EDIT.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.HEARING' }) }) })
    },
  })
  const onSubmit = async (values) => {
    setExpand(false)
    try {
      const payload = {
        currentHearingDate: values.currentDate,
        nextHearingDate: values.nextDate,
        hallNumber: values.hallNo,
        hearingDesigionAr: values.currentDecisionAr,
        hearingDesigionEn: values.currentDecisionEn,
        notes: values.notes,
        hearingTypeId: values.hearingType?.id,
        caseDetailsId: values.caseNumber?.id,
        adimnIds: values.administrativeTaxpayers.map((e) => e.id),
        consultantIds: values.cosultants.map((e) => e.id),
        secretaryIds: values.secretary.map((e) => e.id),
        lawerIds: values.pleadingLawyers.map((e) => e.id),
      }
      console.log(hearingId)

      if (hearingId) {
        await editHearingMutation.mutateAsync({ payload, hearingId })
      } else {
        await addHearingMutation.mutateAsync(payload)
      }
    } catch (error) {
      // addFlashMessage({ type: 'error', message: 'eror' })
      // console.log(error)
    }
  }
  const initialValues = {
    caseNumber: row?.caseDetails?.id || null,
    hearingType: row?.hearingType?.id || null,
    currentDate: row?.currentHearingDate || null,
    nextDate: row?.nextHearingDate || null,
    cosultants: row?.legalConsultant || [],
    pleadingLawyers: row?.lawyer || [],
    administrativeTaxpayers: row?.admins || [],
    secretary: row?.secretary || [],
    directorate: row?.caseDetails?.caseDirectorate?.descriptionEn || '',
    hallNo: row?.hallNumber || '',
    currentDecisionEn: row?.hearingDesigionEn || '',
    currentDecisionAr: row?.hearingDesigionAr || '',
    notes: row?.notes || '',
  }
  const validationSchema = Yup.object().shape({
    caseNumber: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    cosultants: Yup.array()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.CONSULTANT' }) })),

    pleadingLawyers: Yup.array().min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.PLEADINGLAWER' }) })),
    administrativeTaxpayers: Yup.array()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.ADMINISTRATIVETAXPAYER' }) })),
    secretary: Yup.array()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.SECRETARY' }) })),
    currentDate: Yup.date().nullable(),
    nextDate: Yup.date()
      .nullable()
      .min(Yup.ref('currentDate'), intl.formatMessage({ id: 'VALIDATION.ENDDATE' }, { fieldname1: intl.formatMessage({ id: 'ADDFILE.NEXTHEARINGDATE' }), fieldname2: intl.formatMessage({ id: 'ADDFILE.CURRENTHEARINGDATE' }) })),
    hallNo: Yup.string()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .matches(/^\d+$/, intl.formatMessage({ id: 'VALIDATION.NUMBER' })),
  })

  return { initialValues, onSubmit, casesNumbers, hearingTypes, pleadingLawyers, cosultants, validationSchema, administrativeTaxpayers, secretaryList, formRef, expand, setExpand, isEnglish, intl }
}

export default Logic
