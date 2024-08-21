import { useEffect, useState } from 'react'
import UseFlashMessage from '../../../../../../../utils/hooks/UseFlashMessage'
// import { getBranch } from '../../../../../../../services/InvoiceServices'
import { shallowEqual, useSelector } from 'react-redux'

const Logic = (values) => {
  const [serviceCenterOptions, setServiceCenterOptions] = useState([])
  const { addFlashMessage } = UseFlashMessage()
  const [selectedBranch, setSelectedBranch] = useState(null)
  const state = useSelector((state) => {
    const { searchResult } = state.RenewalServiceSlice
    return { searchResult }
  }, shallowEqual)
  // useEffect(() => {
  //   getBranch({
  //     onSuccess: (response) => {
  //       if (response.data) {
  //         console.log('testRes', values.nServiceCenterId)
  //         setServiceCenterOptions(response.data)
  //         console.log(values.nServiceCenterId)

  //         if (values.nServiceCenterId) {
  //           const serviceCenterId = typeof values.nServiceCenterId != 'object' ? values.nServiceCenterId : values.nServiceCenterId?.nexecutiveBranch?.nServiceCenterId

  //           setSelectedBranch(response.data.filter((ele) => ele.nexecutiveBranch.nServiceCenterId == serviceCenterId)?.[0])
  //         }
  //       } else {
  //         addFlashMessage({ type: 'error', message: 'Failed to load Branches' })
  //       }
  //     },
  //   })
  // }, [])

  return { serviceCenterOptions, selectedBranch, setSelectedBranch, state }
}
export default Logic
