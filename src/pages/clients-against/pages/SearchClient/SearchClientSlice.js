import { generateSlice } from '../../../../store/GenerateSlice'

export const SearchClientSlice = generateSlice({
  name: 'SearchClient',
  initialState: { SearchClientResult: [] },
})
