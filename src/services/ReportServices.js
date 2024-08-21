import { FrontAxios } from './axios'

export const getColumnNames = () => {
  return FrontAxios.get(`/api/ExcelCreator/GetColumnNames`)
}

export const generateExcel = (payload) => {
  return FrontAxios.post(`/api/ExcelCreator/GenerateExcel`, payload)
}
