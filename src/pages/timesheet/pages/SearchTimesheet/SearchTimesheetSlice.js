import { generateSlice } from '../../../../store/GenerateSlice'

export const SearchTimesheetSlice = generateSlice({
  name: 'SearchTimesheet',
  initialState: { SearchTimesheetResult: [] },
})
