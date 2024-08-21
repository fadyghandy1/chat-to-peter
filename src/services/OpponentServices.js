import { FrontAxios } from './axios'

export const addOpponent = (payload) => {
  return FrontAxios.post('/api/Against/AddAgainst', payload)
}

export const editOpponent = (payload, id) => {
  return FrontAxios.put(`/api/Against/EditAgainst`, payload)
}

export const searchOpponent = (payload) => {
  return FrontAxios.post('/api/Against/SearchAgainst', payload)
}

export const getOpponent = (payload) => {
  return FrontAxios.get(`/api/Against/GetById/${payload}`)
}
export const deleteOpponent = (payload) => {
  return FrontAxios.delete(`/api/Against/DeleteAgainst/${payload}`)
}

export const searchOpponentName = (payload) => {
  return FrontAxios.get('/api/Clients/SearchName', {
    params: {
      name: payload,
    },
  })
}
