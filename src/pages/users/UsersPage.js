import { Routes, Route, Outlet } from 'react-router-dom'
import { AddUser } from './pages/AddUser/AddUser'
import { SearchUser } from './pages/SearchUser/SearchUser'

const UsersPage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="add-user"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <AddUser />
          </>
        }
      />
      <Route
        path="search-user"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <SearchUser />
          </>
        }
      />
    </Route>
  </Routes>
)

export default UsersPage
