import { FrontAxios } from './axios'

export const addHearing = (payload) => {
  return FrontAxios.post('/api/Hearing', payload)
}
export const editHearing = (payload, HearingId) => {
  return FrontAxios.put(`/api/Hearing/${HearingId}`, payload)
}
export const gethearingByCaseFileNumber = (caseFileNumber) => {
  return FrontAxios.get(`/api/Hearing/GethearingByCaseFileNumber/${caseFileNumber}`)
}
export const gethearingByHearingId = (HearingId) => {
  return FrontAxios.get(`/api/Hearing/${HearingId}`)
}
export const deleteHearing = (HearingId) => {
  return FrontAxios.delete(`/api/Hearing?hearingId=${HearingId}`)
}
