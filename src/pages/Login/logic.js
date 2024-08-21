import { useState } from 'react'
import { login } from '../../services/UserServices'
import { appSlice } from '../../store/AppSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UseFlashMessage from '../../utils/hooks/UseFlashMessage'
import { jwtDecode } from 'jwt-decode'
import { useMutation } from 'react-query'
import { useLocation } from 'react-router-dom'

const Logic = () => {
  const { update: appUpdate } = appSlice.actions
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { addFlashMessage } = UseFlashMessage()
  const { state } = useLocation()
  const loginMutation = useMutation((credentials) => login(credentials), {
    onSuccess: (response) => {
      const decodedInfo = jwtDecode(response.data.token)
      localStorage.setItem(process.env.REACT_APP_TOKEN, response.data.token)
      localStorage.setItem(process.env.REACT_APP_IS_PENDING, decodedInfo?.isPending)

      dispatch(appUpdate([{ prop: 'token', value: response.data.token }]))

      decodedInfo?.isPending ? navigate('/reassign-password', { replace: true }) : navigate(state?.path || '/', { replace: true })
      addFlashMessage({ type: 'success', message: 'Welcome ' + decodedInfo?.unique_name })
    },
  })

  const handleFormSubmit = async (values) => {
    try {
      await loginMutation.mutateAsync({ username: values.username, password: values.password })
    } catch (error) {
      console.log(error)
    }

    // setIsSubmitting(true)

    // login({
    //   payload: { username: values.username, password: values.password },
    //   onSuccess: (response) => {
    //     const decodedInfo = jwtDecode(response.data.token)
    //     console.log(decodedInfo)
    //     localStorage.setItem(LOCAL_STORAGE_CONSTANT.TOKEN, response.data.token)

    //     dispatch(
    //       appUpdate([
    //         { prop: 'token', value: response.data.token },
    //         { prop: 'isPending', value: decodedInfo?.isPending },
    //       ])
    //     )
    //
    //     decodedInfo?.isPending ? navigate('/reassign-password', { replace: true }) : navigate('/', { replace: true })
    //     addFlashMessage({ type: 'success', message: 'Welcome ' + decodedInfo?.unique_name })
    //   },
    //   onComplete: (e) => {
    //     setIsSubmitting(false)
    //     // setData({
    //     //   isSubmitting: false,
    //     //   errorMessage: e,
    //     // })
    //   },
    // })
  }

  return { handleFormSubmit, loginMutation }
}

export default Logic
