import { FrontAxios } from './axios'

// export const login = ({ payload, onSuccess, onError = () => {}, onComplete = () => {} }) => {
//   return securityAxios
//     .post('/api/Auth/Login', payload)
//     .then(function (response) {
//
//       onSuccess(response)
//     })
//     .catch((e) => {
//
//       onError(e)
//     })
//     .finally(() => {
//       onComplete()
//     })
// }
export const login = (payload) => {
  return FrontAxios.post('/api/Auth/Login', payload)
}

export const logout = (payload) => {
  return FrontAxios.post('/api/Auth/Logout', null, {
    params: {
      ...payload,
    },
  })
}

export const changePassword = (payload) => {
  return FrontAxios.post('/api/User/ChangePassword', payload)
}

export const registeration = (payload) => {
  return FrontAxios.post('/api/Auth/Register', payload)
}
