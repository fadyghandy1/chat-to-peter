import { FrontAxios } from './axios'

export const createCaseFIle = (payload) => {
  return FrontAxios.post('/api/CaseFile/CreateCaseFile', payload)
}
export const searchFile = (payload) => {
  return FrontAxios.post('/api/CaseFile/SearchFile', payload)
}
