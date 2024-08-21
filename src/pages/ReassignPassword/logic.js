import { changePassword } from '../../services/UserServices'
import { useNavigate } from 'react-router-dom'
import UseFlashMessage from '../../utils/hooks/UseFlashMessage'
import { useMutation } from 'react-query'
import { jwtDecode } from 'jwt-decode'

const Logic = () => {
  const navigate = useNavigate()
  const { addFlashMessage } = UseFlashMessage()

  const changePasswordMutation = useMutation((credentials) => changePassword(credentials), {
    onSuccess: (response) => {
      localStorage.setItem(process.env.REACT_APP_IS_PENDING, 'false')

      navigate('/', { replace: true })
      addFlashMessage({ type: 'success', message: 'Welcome' })
    },
  })

  const handleFormSubmit = async (values) => {
    try {
      const token = localStorage.getItem(process.env.REACT_APP_TOKEN)
      const decodedInfo = jwtDecode(token)
      await changePasswordMutation.mutateAsync({
        oldPassword: values.oldPassword,
        password: values.password,
        // confirmPassword: values.confirmPassword,
        userName: decodedInfo?.unique_name,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return { handleFormSubmit, changePasswordMutation }
}

export default Logic
