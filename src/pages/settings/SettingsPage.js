import { Routes, Route, Outlet } from 'react-router-dom'
import { SystemCodes } from './pages/SystemCodes/SystemCodes'
import { Lookups } from './pages/Lookups/Lookups'
import { Backup } from './pages/backup/Backup'
import { LawFirmData } from './pages/LawFirmData/LawFirmData'
import { Judgements } from './pages/Judgements/Judgements'
import { ImageConfiguration } from './pages/ImageConfiguration/ImageConfiguration'
// import { Lookups } from './pages/Lookup/Lookups'

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

const SettingsPage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="system-codes"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <SystemCodes />
          </>
        }
      />
      <Route
        path="judgements"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <Judgements />
          </>
        }
      />
      <Route
        path="lookups"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <Lookups />
          </>
        }
      />
      <Route
        path="backup"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <Backup />
          </>
        }
      />
      <Route
        path="law-firm-data"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <LawFirmData />
          </>
        }
      />
      <Route
        path="image-configuration"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <ImageConfiguration />
          </>
        }
      />
    </Route>
  </Routes>
)

export default SettingsPage
