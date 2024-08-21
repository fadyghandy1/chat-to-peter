import { FrontAxios } from './axios'

export const getNationality = () => {
  return FrontAxios.get('/api/Lookups/GetNationality')
}

export const getBranch = () => {
  return FrontAxios.get('/api/Lookups/GetBranch')
}

export const getCity = () => {
  return FrontAxios.get('/api/Lookups/GetCity')
}

export const getClientType = () => {
  return FrontAxios.get('/api/Lookups/GetClientType')
}

export const getGender = () => {
  return FrontAxios.get('/api/Lookups/GetGender')
}

export const getImageType = () => {
  return FrontAxios.get('/api/Lookups/GetImageType')
}
export const getTaskType = () => {
  return FrontAxios.get('/api/Lookups/GetTaskType')
}
export const getTaskStatus = () => {
  return FrontAxios.get('/api/Lookups/GetTaskStatus')
}
export const getStaffData = () => {
  return FrontAxios.get('/api/Staff')
}
export const getFileType = () => {
  return FrontAxios.get('/api/Lookups/GetFileType')
}

export const getFileCategory = () => {
  return FrontAxios.get('/api/Lookups/GetFileCategory')
}
export const getAllOfficesBranches = () => {
  return FrontAxios.get('/api/Lookups/GetAllOfficesBranches')
}

export const getAllFilesStatuses = () => {
  return FrontAxios.get('/api/Lookups/GetAllFilesStatuses')
}
export const getAllClientCharacteristic = () => {
  return FrontAxios.get('/api/Lookups/GetAllClientCharacteristic')
}

export const getAllAgainstCharacteristic = () => {
  return FrontAxios.get('/api/Lookups/GetAllAgainstCharacteristic')
}

export const getListOfLegalConsaultants = () => {
  return FrontAxios.get('/api/StaticData/ListOfLegalConsaultants')
}

export const getListOfLawyers = () => {
  return FrontAxios.get('/api/StaticData/ListOfLawyers')
}

export const getListOfAdmins = () => {
  return FrontAxios.get('/api/StaticData/ListOfAdmins')
}

export const getListOfSecretaries = () => {
  return FrontAxios.get('/api/StaticData/ListOfSecretaries')
}

export const getAllCaseStages = () => {
  return FrontAxios.get('/api/Lookups/GetAllCaseStages')
}

export const getAllCourts = () => {
  return FrontAxios.get('/api/Lookups/GetAllCourts')
}

export const getAllDirectorates = () => {
  return FrontAxios.get('/api/Lookups/GetAllDirectorates')
}
export const getHearingType = () => {
  return FrontAxios.get('/api/Lookups/GetHearingType')
}

export const getAllCaseTypes = () => {
  return FrontAxios.get('/api/Lookups/GetAllCaseTypes')
}

export const getAllCaseStatus = () => {
  return FrontAxios.get('/api/Lookups/GetAllCaseStatus')
}

export const getListOfClients = (query) => {
  const params = query ? { query } : {}
  return FrontAxios.get('/api/StaticData/ListOfClients', { params })
}
export const getListOfAgainsts = (query) => {
  const params = query ? { query } : {}
  return FrontAxios.get('/api/StaticData/ListOfAgainsts', { params })
}

export const getListOfExpertOffices = () => {
  return FrontAxios.get('/api/StaticData/ListOfExpertOffices')
}

export const getListOfExperts = () => {
  return FrontAxios.get('/api/StaticData/ListOfExperts')
}

export const getAllRoles = () => {
  return FrontAxios.get('/api/Role')
}

// handle lookups
export const getMasterLookups = () => {
  return FrontAxios.get('/api/LookupCodes/GetMasterCodes')
}

export const getMasterLookupsDetails = (payload) => {
  return FrontAxios.get('/api/LookupCodes/GetDetailCodes/' + payload)
}

export const addLookups = (payload) => {
  return FrontAxios.post('/api/LookupCodes/CreateDetailCode', payload)
}

export const updateLookups = (payload) => {
  return FrontAxios.put('/api/LookupCodes/UpdateDetailCode', payload)
}
export const deleteLookups = (payload) => {
  return FrontAxios.delete('/api/LookupCodes/DeleteDetailCode/' + payload)
}
export const getCompany = () => {
  return FrontAxios.get('/api/Lookups/GetCompany')
}
