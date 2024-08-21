import React, { useCallback, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import UseFlashMessage from '../../utils/hooks/UseFlashMessage'
import { appSlice } from '../../store/AppSlice'
// import { getUserPages } from '../../services/UserServices'
// import { getAllLookupTables, getCurrentAppVersion } from '../../services/CommonServices'

const Logic = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openPersistentDrawer, setopenPersistentDrawer] = React.useState(true)

  const { addFlashMessage } = UseFlashMessage()
  const { update: appUpdate } = appSlice.actions
  const dispatch = useDispatch()

  function handlePersistentDrawerOpen() {
    setopenPersistentDrawer(true)
  }

  const handlePersistentDrawerClose = useCallback(() => {
    setopenPersistentDrawer(false)
  }, [])
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState)
  }, [])

  // useEffect(() => {
  //   if (state.isAuthenticated) {
  //     // handleGetUserPages()
  //     // callCacheData()
  //     // GetCopyRight()
  //   }
  // }, [state.isAuthenticated])
  // useEffect(() => {
  //   appUpdate([{ prop: 'modulePages', value: response.data }])
  // }, [])

  return { mobileOpen, openPersistentDrawer, handlePersistentDrawerOpen, handlePersistentDrawerClose, handleDrawerToggle }
}

export default Logic
