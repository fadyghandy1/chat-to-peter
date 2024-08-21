import { searchTableColumns } from '../../constants'
import { useIntl } from 'react-intl'
import { useMemo, useState, useRef, useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
// import { handleBase64ToPreview } from '../../../../../../utils/common'
// import { getClient, searchClient } from '../../../../../../services/ClientServices'
import { shallowEqual, useSelector } from 'react-redux'

function Logic(searchRef) {
  //   const [clientInfo, setClientInfo] = useState()
  //   const [contactPerson, setContactPerson] = useState([])
  const [expand, setExpand] = useState(true)

  // const queryClient = useQueryClient()
  const state = useSelector((state) => {
    const { SearchFileResult } = state.SearchFile
    return { SearchFileResult }
  }, shallowEqual)
  debugger
  //   const DeleteModalRef = useRef()

  const intl = useIntl()

  //   const getClientMutation = useMutation((payload) => getClient(payload), {
  //     onSuccess: (response) => {
  //       debugger
  //       const data = response.data.model
  //       if (data) {
  //         const contacts = data.clientContactPersons.map((contact) => {
  //           return {
  //             id: contact.id,
  //             contactName: contact.name,
  //             contactPhone: contact.phone,
  //             contactMobile: contact.mobileNumber,
  //             contactEmail: contact.email,
  //             contactUserName: contact.userName,
  //             contactPassword: contact.password,
  //             contactJob: contact.job,
  //             hasPowerOfAttorny: contact.hasPowerOfAttorny,
  //             allowContact: contact.allowContact,
  //             ...contact,
  //           }
  //         })
  //         // const attachments = data.clientDocuments.map((doc) => {
  //         //   return {
  //         //     attachmentType: doc?.document?.attachmentTypeId,
  //         //     issuedDate: doc?.document?.issuedDate,
  //         //     expiryDate: doc?.document?.expiryDate,
  //         //     attachmentName: doc?.document?.name,
  //         //     attachment: handleBase64ToPreview({ base64: doc?.document?.file, extension: doc?.document?.extension }),
  //         //     attachmentNameOfTypeAR: doc?.document?.attachmentType?.descriptionAr,
  //         //     isDeleted: doc.document.isDeleted,
  //         //     ...doc,
  //         //   }
  //         // })

  //         setClientInfo({ ...data, contacts, clientDocuments: attachments })
  //         setContactPerson(contacts)
  //       }

  //       console.log('getClient', data)
  //     },
  //     onError: (err) => {
  //       debugger
  //       console.log(err)
  //     },
  //     // onSettled: () => {
  //     //   setIsLoading(false)
  //     // },
  //   })

  //   const editClient = async (row) => {
  //     try {
  //       setExpand(false)
  //       await getClientMutation.mutateAsync(row.id)
  //     } catch (error) {
  //       // addFlashMessage({ type: 'error', message: 'eror'})
  //       console.log(error)
  //     }
  //   }

  //   const deleteClient = (row) => {
  //     if (DeleteModalRef.current) DeleteModalRef.current.open(row.id)
  //   }

  const viewClient = (row, index) => {}

  //   const actions = {
  //     deleteClient: deleteClient,
  //     editClient: editClient,
  //     viewClient: viewClient,
  //   }

  let columns = useMemo(() => searchTableColumns(intl), [])
  console.log(columns, 'ffffffaaadyyyy')
  //   const handleOnUpdated = useCallback(() => {
  //     if (searchRef.current) searchRef.current.submitForm()

  //     setClientInfo()
  //   }, [])

  //   const initialValues = {
  //     id: clientInfo?.id ?? null,
  //     clientArName: clientInfo?.clientArName ?? '',
  //     clientEnName: clientInfo?.clientEnName ?? '',
  //     branchId: clientInfo?.branchId || null,
  //     telephoneNumber: clientInfo?.telephoneNumber ?? '',
  //     fax: clientInfo?.fax ?? '',
  //     mobileNumber: clientInfo?.mobileNumber ?? '',
  //     nationalityId: clientInfo?.nationalityId || null,
  //     postalCode: clientInfo?.postalCode ?? '',
  //     cityId: clientInfo?.cityId ?? '',
  //     street: clientInfo?.street ?? '',
  //     apartmentNumber: clientInfo?.apartmentNumber,
  //     buildingNumber: clientInfo?.buildingNumber ?? '',
  //     email: clientInfo?.email ?? '',
  //     email2: clientInfo?.email2 ?? '',
  //     clientTypeId: clientInfo?.clientTypeId ?? '',
  //     valueOfWorkingHour: clientInfo?.valueOfWorkingHour ?? '',
  //     referenceNumber: clientInfo?.referenceNumber ?? '',
  //     localIdentificationNumber: clientInfo?.localIdentificationNumber ?? '',
  //     passportNumber: clientInfo?.passportNumber,
  //     companyName: clientInfo?.companyName ?? '',
  //     address: clientInfo?.address ?? '',
  //     credentialUserName: clientInfo?.clientPortalCredentials.length ? clientInfo?.clientPortalCredentials[0]?.userName : '',
  //     credentialPassword: clientInfo?.clientPortalCredentials.length ? clientInfo?.clientPortalCredentials[0]?.password : '',
  //     credentialID: clientInfo?.clientPortalCredentials.length ? clientInfo?.clientPortalCredentials[0]?.id : 0,
  //     attachments: clientInfo?.clientDocuments ?? [],
  //     contacts: contactPerson ?? [],
  //   }
  console.log(columns, 'ffffffaaadyyyy2')

  return { columns, state, expand, setExpand }
}

export default Logic
