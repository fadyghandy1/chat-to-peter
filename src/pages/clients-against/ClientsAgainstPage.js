import { Routes, Route, Outlet } from 'react-router-dom'
import AddClient from './pages/add-client/AddClient/AddClient'
import { SearchClient } from './pages/SearchClient/SearchClient'
import AddOpponent from './pages/AddAgainst/AddOpponent'
import { SearchAgainst } from './pages/SearchAgainst/SearchAgainst'
import AddClientCorporate from './pages/add-client/AddClientCorporate/AddClientCorporate'

const ClientsAndAgainstPage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="add-client"
        element={
          <>
            <AddClient />
          </>
        }
      />
      <Route
        path="search-client"
        element={
          <>
            <SearchClient />
          </>
        }
      />
      <Route
        path="add-against"
        element={
          <>
            <AddOpponent />
          </>
        }
      />
      <Route
        path="search-against"
        element={
          <>
            <SearchAgainst />
          </>
        }
      />
      <Route
        path="add-client-corporate"
        element={
          <>
            <AddClientCorporate />
          </>
        }
      />
    </Route>
  </Routes>
)

export default ClientsAndAgainstPage
