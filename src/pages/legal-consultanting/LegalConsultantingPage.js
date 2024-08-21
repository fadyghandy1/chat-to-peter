import { Routes, Route, Outlet } from 'react-router-dom'
import { AddConsultant } from './pages/AddConsultant/AddConsultant'
import { SearchConsultant } from './pages/SearchConsultant/SearchConsultant'

const LegalConsultantingPage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="add-consultant"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <AddConsultant />
          </>
        }
      />
      <Route
        path="search-consultant"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <SearchConsultant />
          </>
        }
      />
    </Route>
  </Routes>
)

export default LegalConsultantingPage
