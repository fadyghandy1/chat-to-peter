import { useDispatch } from 'react-redux'
import { SearchExpertSlice } from '../../SearchExpertSlice'

function Logic() {
  const dispatch = useDispatch()
  const { update } = SearchExpertSlice.actions
  const initialValues = {
    name_en: '',
    name_ar: '',
    phone: '',
    mobile: '',
    nationality: '',
    branch: '',
  }
  const onSubmit = () => {
    dispatch(
      update([
        {
          prop: 'SearchExpertResult',
          value: true,
        },
      ])
    )
  }
  return { onSubmit, initialValues }
}

export default Logic
