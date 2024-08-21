import React, { Suspense, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import StyledAppBarMain from './components/AppBarMain/AppBarMain.styles'
// import StyledAppDrawer from './components/AppDrawer/AppDrawer.styles'
import { Main } from './DefaultLayout.styles'
import Logic from './logic'
import LoadingDotsIcon from '../../components/common/LoadingDotsIcon/LoadingDotsIcon.styles'
import AppDrawer from './components/AppDrawer/AppDrawer'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import ChatButton from './components/Chat/ChatButton/ChatButton.styles'

const DefaultLayout = () => {
  const { mobileOpen, openPersistentDrawer, handlePersistentDrawerOpen, handlePersistentDrawerClose, handleDrawerToggle } = Logic()
  // const state = useSelector((state) => {
  //   const { modulePages, cacheData, favMenu } = state.app
  //   return { modulePages, cacheData, favMenu }
  // }, shallowEqual)
  const isPending = localStorage.getItem(process.env.REACT_APP_IS_PENDING)
  // if (isPending !== 'false') {
  //   return <Navigate to="/reassign-password" />
  // }

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBarMain handleDrawerToggle={handleDrawerToggle} openPersistentDrawer={openPersistentDrawer} handlePersistentDrawerOpen={handlePersistentDrawerOpen} />
      <AppDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} openPersistentDrawer={openPersistentDrawer} handlePersistentDrawerClose={handlePersistentDrawerClose} />

      <Main openPersistentDrawer={openPersistentDrawer}>
        <Suspense fallback={<LoadingDotsIcon />}>
          <Outlet />
        </Suspense>
        <ChatButton />
      </Main>
    </Box>
  )
}

export default DefaultLayout
