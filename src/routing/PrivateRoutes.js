import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout.styles'
import Dashboard from '../pages/dashboard/Dashboard'
import ProtectedRoute from '../components/common/ProtectedRoute/ProtectedRoute'
import ReassignPassword from '../pages/ReassignPassword/ReassignPassword.styles'

const PrivateRoutes = () => {
  const ClientsAgainstsPage = lazy(() => import('../pages/clients-against/ClientsAgainstPage'))
  const LegalFilesPage = lazy(() => import('../pages/legical-files/LegalFilesPage'))
  const LegalConsultantingPage = lazy(() => import('../pages/legal-consultanting/LegalConsultantingPage'))
  const ComplaintsPage = lazy(() => import('../pages/complaints/ComplaintsPage'))
  const TimeSheetPage = lazy(() => import('../pages/timesheet/TimeSheetPage'))
  const ReportsPage = lazy(() => import('../pages/reports/ReportsPage'))

  const UsersPage = lazy(() => import('../pages/users/UsersPage'))
  const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'))

  return (
    <Routes>
      <Route
        path="reassign-password"
        element={
          <ProtectedRoute>
            <ReassignPassword />
          </ProtectedRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <DefaultLayout />
          </ProtectedRoute>
        }
      >
        {/* Pages */}

        <Route path="dashboard" element={<Dashboard />} />
        <Route index element={<Navigate to="/dashboard" />} />

        {/* Lazy Modules */}
        <Route path="clients-againsts/*" element={<ClientsAgainstsPage />} />
        <Route path="legal-files/*" element={<LegalFilesPage />} />
        <Route path="legal-consultanting/*" element={<LegalConsultantingPage />} />
        <Route path="complaints/*" element={<ComplaintsPage />} />
        <Route path="timesheet/*" element={<TimeSheetPage />} />
        <Route path="reports/*" element={<ReportsPage />} />
        <Route path="users/*" element={<UsersPage />} />
        <Route path="settings/*" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export { PrivateRoutes }
