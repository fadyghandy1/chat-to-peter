import { generateSlice } from '../../../../store/GenerateSlice'

export const SearchAgainstSlice = generateSlice({
  name: 'SearchAgainst',
  initialState: { SearchAgainstResult: [] },
})
