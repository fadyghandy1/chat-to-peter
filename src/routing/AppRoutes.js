import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Page404 from '../pages/Page404/Page404.styles'
import { PrivateRoutes } from './PrivateRoutes'
import Login from '../pages/Login/Login.styles'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PrivateRoutes />} />

      <Route path="/login" element={<Login />} index />

      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default AppRoutes
