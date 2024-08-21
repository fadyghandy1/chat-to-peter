import { FrontAxios } from './axios'

export const searchClient = (payload) => {
  return FrontAxios.post('/api/Clients/SearchClients', payload)
}

export const addClient = (payload) => {
  return FrontAxios.post('/api/Clients/AddClient', payload)
}

export const editClient = (payload, id) => {
  return FrontAxios.put(`/api/Clients/UpdateClient`, payload)
}

export const getClient = (payload) => {
  return FrontAxios.get(`/api/Clients/GetClient/${payload}`)
}

export const deleteClient = (payload) => {
  return FrontAxios.delete(`/api/Clients/DeleteClient/${payload}`)
}
