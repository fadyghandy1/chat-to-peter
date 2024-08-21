import { generateSlice } from '../../../../store/GenerateSlice'

export const SearchFileSlice = generateSlice({
  name: 'SearchFile',
  initialState: { SearchFileResult: [] },
})
