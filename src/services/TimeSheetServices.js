import { FrontAxios } from './axios'

export const addTimeSheetWithoutFile = (payload) => {
  return FrontAxios.post('/api/Task/CreateTaskWithoutFile', payload)
}
export const addTimeSheetWithFile = (payload) => {
  return FrontAxios.post('/api/Task/CreateTaskWithFile', payload)
}
export const searchTimeSheet = (payload) => {
  return FrontAxios.post('/api/Task/SearchInTimeSheet', payload)
}
export const deleteTimeSheet = (payload) => {
  return FrontAxios.delete(`/api/Task/${payload}`)
}
export const editTimeSheet = (payload, taskId) => {
  return FrontAxios.put(`/api/Task/${taskId}`, payload)
}
export const getTimesheetById = (taskId) => {
  return FrontAxios.get(`/api/Task/GetTaskById/${taskId}`)
}
