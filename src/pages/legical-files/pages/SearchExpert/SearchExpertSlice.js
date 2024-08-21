import { generateSlice } from '../../../../store/GenerateSlice'

export const SearchExpertSlice = generateSlice({
  name: 'SearchExpert',
  initialState: { SearchExpertResult: false },
})
