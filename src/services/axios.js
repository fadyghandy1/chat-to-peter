import axios from 'axios'
import store from '../store/store'
import { appSlice } from '../store/AppSlice'

// export const securityAxios = axios.create({
//   baseURL: process.env.REACT_APP_BASEURL,
//   headers: {
//     post: {
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//   },
// })

export const FrontAxios = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    post: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  },
})

// export const NotificationAxios = axios.create({
//   baseURL: process.env.REACT_APP_NotificationIURL,
//   headers: {
//     post: {
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//   },
// })

// export const ReportAxios = axios.create({
//   baseURL: process.env.REACT_APP_reportAPIURL,
//   headers: {
//     post: {
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//   },
// })

// export const cacheAxiosApi = axios.create({
//   baseURL: process.env.REACT_APP_tmsAPIURL,
//   headers: {
//     post: {
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//   },
// })
// export const printerAxios = axios.create({
//   baseURL: process.env.REACT_APP_printServerAPIURL,
//   headers: {
//     post: {
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//   },
// })

const requestHandler = async (request) => {
  const authToken = await localStorage.getItem(process.env.REACT_APP_TOKEN)
  // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFobWVkLnJhbWFkYW4zIiwidXBuIjoiQWhtZWQgUmFtYWRhbiIsImVtYWlsIjoiYWFAYWEuY29tIiwibmFtZWlkIjoiODc0MTNlODgtYWNhMC00ODAxLWIyODQtOTJjZDc0MmNjODhiIiwiZ2l2ZW5fbmFtZSI6IjEiLCJkZW55b25seXNpZCI6IlRydWUiLCJkZW55b25seXByaW1hcnlzaWQiOiJGYWxzZSIsInJvbGUiOlsiU3VwZXJBZG1pbkxpdmUiLCJTdXBlciBBZG1pbiJdLCJhdWQiOlsiaHR0cDovL250bS1hcHAvIiwiaHR0cDovL250bS1hcHAvVE1TQVBJLyIsImh0dHA6Ly9udG0tYXBwL1RNU1ByaW50LyIsImh0dHA6Ly9udG0tYXBwL1RNU1JlcG9ydC8iLCJodHRwOi8vbnRtLWFwcC9UTVNOb3RpZmljYXRpb24vIl0sIm5iZiI6MTY5OTc5MDI3NCwiZXhwIjoxNjk5ODUwMjc0LCJpYXQiOjE2OTk3OTAyNzQsImlzcyI6Imh0dHA6Ly9udG0tYXBwL1RNU0F1dGgvIn0.yFTAP24WlBCBe8OkYkIntvHar_O-kCZkI7cYa2JrBtQ'
  let headers = {}
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`
  }

  request.headers = {
    ...request.headers,
    ...headers,
  }

  return request
}
const responseHandler = (response) => {
  return response
}
const exceptionHandler = (error) => {
  const { merge: appMerge } = appSlice.actions

  if (error.response.status === 401) {
    localStorage.clear()

    window.location.href = '/login'
  }
  let msg = error.message || 'Server Request Failed'

  if (!!error.response && !!error.response.data) {
    // msg = error.response.data
    if (!!error.response.data.message) {
      msg = error.response.data.message
    }
  }

  store.dispatch(
    appMerge([
      {
        prop: 'flashMessages',
        value: [{ type: 'error', message: msg, id: (Date.now() + '-' + Math.random()).toString(16).replace(/\./g, ''), start_time: Date.now() }],
      },
    ])
  )

  return Promise.reject(error)
}
// // NotificationAxios REQUEST HANDLER
// NotificationAxios.interceptors.request.use((request) => requestHandler(request))

// // NotificationAxios RESPONSE HANDLER
// NotificationAxios.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => exceptionHandler(error)
// )

// // securityAxios REQUEST HANDLER
// securityAxios.interceptors.request.use((request) => requestHandler(request))

// // securityAxios RESPONSE HANDLER
// securityAxios.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => exceptionHandler(error)
// )
// // printerAxios REQUEST HANDLER
// printerAxios.interceptors.request.use((request) => requestHandler(request))

// // printerAxios RESPONSE HANDLER
// printerAxios.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => exceptionHandler(error)
// )
// FrontAxios REQUEST HANDLER
FrontAxios.interceptors.request.use((request) => requestHandler(request))

// FrontAxios RESPONSE HANDLER
FrontAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => exceptionHandler(error)
)

// // cacheAxiosApi REQUEST HANDLER
// cacheAxiosApi.interceptors.request.use((request) => requestHandler(request))

// // cacheAxiosApi RESPONSE HANDLER
// cacheAxiosApi.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => exceptionHandler(error)
// )
// // ReportAxios REQUEST HANDLER
// ReportAxios.interceptors.request.use((request) => requestHandler(request))

// // ReportAxios RESPONSE HANDLER
// ReportAxios.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => exceptionHandler(error)
// )

// handle cancel token
const CancelToken = axios.CancelToken

export function createCancelTokenHandler(apiObject) {
  // initializing the cancel token handler object
  const cancelTokenHandler = {}

  // for each property in apiObject, i.e. for each request
  apiObject.forEach((propertyName) => {
    // initializing the cancel token of the request
    const cancelTokenRequestHandler = {
      cancelToken: undefined,
    }
    console.log(propertyName)
    // associating the cancel token handler to the request name
    cancelTokenHandler[propertyName] = {
      handleRequestCancellation: () => {
        // if a previous cancel token exists,
        // cancel the request

        cancelTokenRequestHandler.cancelToken && cancelTokenRequestHandler.cancelToken.cancel(`${propertyName} canceled`)

        // creating a new cancel token
        cancelTokenRequestHandler.cancelToken = CancelToken.source()

        // returning the new cancel token
        return cancelTokenRequestHandler.cancelToken
      },
    }
  })

  return cancelTokenHandler
}
