import { generateSlice } from './GenerateSlice'

export const appSlice = generateSlice({
  name: 'app',
  initialState: {
    token: localStorage.getItem(process.env.REACT_APP_TOKEN),
    flashMessages: [],
  },
})
