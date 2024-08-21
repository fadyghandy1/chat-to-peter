import { FrontAxios } from './axios'

export const getAllCasesByFileNumber = (payload) => {
  return FrontAxios.get(`/api/CaseDetials/${payload}`)
}

export const createCaseStage = (payload) => {
  return FrontAxios.post('/api/CaseStages/CreateStage', payload)
}

export const getAllStages = ({ caseMasterId }) => {
  return FrontAxios.get('/api/CaseStages/GetAllStages', {
    params: {
      caseMasterId,
    },
  })
}

export const getStage = (id) => {
  return FrontAxios.get('/api/CaseStages/GetStageById/' + id)
}

export const getCaseDocument = (id) => {
  return FrontAxios.get('/api/CaseStages/GetCaseDocumentById/' + id)
}

export const getAllCaseDocuments = ({ caseMasterId, caseDetailsId }) => {
  return FrontAxios.get('/api/CaseStages/GetAllCaseDocuments', {
    params: {
      caseMasterId,
      caseDetailsId,
    },
  })
}

export const updateStage = ({ payload, id }) => {
  return FrontAxios.put('/api/CaseStages/UpdateStage/' + id, payload)
}

export const updateDocument = ({ payload, id }) => {
  return FrontAxios.put('/api/CaseStages/UpdateCaseDocument/' + id, payload)
}

export const deleteStage = (id) => {
  return FrontAxios.delete('/api/CaseStages/DeleteStage/' + id)
}

export const deleteDocument = (id) => {
  return FrontAxios.delete('/api/CaseStages/DeleteCaseDocument/' + id)
}

export const createStageDocument = (payload) => {
  return FrontAxios.post('/api/CaseStages/CreateCaseDocument', payload)
}
