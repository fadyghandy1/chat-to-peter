import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appSlice } from './AppSlice'
import { SearchClientSlice } from '../pages/clients-against/pages/SearchClient/SearchClientSlice'
import { SearchAgainstSlice } from '../pages/clients-against/pages/SearchAgainst/SearchAgainstSlice'
import { SearchExpertSlice } from '../pages/legical-files/pages/SearchExpert/SearchExpertSlice'
import { AddExpertSlice } from '../pages/legical-files/pages/AddExpert/AddExpertSlice'
import { SearchTimesheetSlice } from '../pages/timesheet/pages/SearchTimesheet/SearchTimesheetSlice'
import { SearchFileSlice } from '../pages/legical-files/pages/SearchFile/SearchFileSlice'

const reducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [SearchClientSlice.name]: SearchClientSlice.reducer,
  [SearchAgainstSlice.name]: SearchAgainstSlice.reducer,
  [SearchExpertSlice.name]: SearchExpertSlice.reducer,
  [AddExpertSlice.name]: AddExpertSlice.reducer,
  [SearchTimesheetSlice.name]: SearchTimesheetSlice.reducer,
  [SearchFileSlice.name]: SearchFileSlice.reducer,
})

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
