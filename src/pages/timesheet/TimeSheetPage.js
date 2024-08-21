import { Routes, Route, Outlet } from 'react-router-dom'

import { AddTimesheet } from './pages/AddTimesheet/AddTimesheet'
import { SearchTimesheet } from './pages/SearchTimesheet/SearchTimesheet'
import { FollowUpReport } from './pages/FollowUpReport/FollowUpReport'

// const profileBreadCrumbs: Array<PageLink> = [
//   {
//     title: "Profile",
//     path: "/crafted/pages/profile/overview",
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: "",
//     path: "",
//     isSeparator: true,
//     isActive: false,
//   },
// ];

const TimeSheetPage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="add-timesheet"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <AddTimesheet />
          </>
        }
      />
      <Route
        path="search-timesheet"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <SearchTimesheet />
          </>
        }
      />
      <Route
        path="follow-up-report"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <FollowUpReport />
          </>
        }
      />
    </Route>
  </Routes>
)

export default TimeSheetPage
