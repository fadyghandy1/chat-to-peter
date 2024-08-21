import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Badge, Button, Popover, Typography, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Notifications as NotificationsIcon, TouchApp as TouchAppIcon, ExitToApp as ExitToAppIcon, SettingsApplications as MiscellaneousServicesIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { UserMenuContainer } from './UserMenu.styles'
import { appSlice } from '../../../../store/AppSlice'
import LogoImage from '../../../../assets/images/Dubai_logo-1-1-1_ab6ffcbb-fc57-438d-ae7b-4bfd451275a1_mini.webp'
import { setLanguage, useLang } from '../../../../i18n/i18n'
import { useIntl } from 'react-intl'
import unitedFlag from '../../../../assets/images/united-states.svg'
import emiratesFlag from '../../../../assets/images/united-arab-emirates.svg'
import AvatarImage from '../../../../assets/images/300-1.jpg'
import { useMutation } from 'react-query'
import { jwtDecode } from 'jwt-decode'
import { logout } from '../../../../services/UserServices'

const UserMenu = ({ className }) => {
  const { update: appUpdate } = appSlice.actions
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [userMenu, setUserMenu] = useState(null)
  const navigate = useNavigate()
  const lang = useLang()
  const intl = useIntl()
  const dispatch = useDispatch()
  const logoutMutation = useMutation((credentials) => logout(credentials), {
    onSuccess: (response) => {
      localStorage.removeItem(process.env.REACT_APP_TOKEN)

      dispatch(appUpdate([{ prop: 'token', value: undefined }]))
      navigate('/login', { replace: true })
    },
  })

  const handleFormSubmit = async (values) => {
    try {
      const token = localStorage.getItem(process.env.REACT_APP_TOKEN)
      const decodedInfo = jwtDecode(token)
      await logoutMutation.mutateAsync({ token: token, UserId: decodedInfo?.nameid })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={className}>
      <UserMenuContainer>
        <Button className="min-h-40 userBtn" onClick={(event) => setUserMenu(event.currentTarget)}>
          <div className="userText">
            <Typography className="userTitle">User</Typography>
          </div>
          <Avatar alt="user photo" src={AvatarImage} />
        </Button>

        <Popover
          open={Boolean(userMenu)}
          anchorEl={userMenu}
          onClose={() => setUserMenu(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          classes={{
            paper: 'py-8',
          }}
        >
          <MenuItem onClick={handleFormSubmit}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={intl.formatMessage({ id: 'HEADER.LOGOUT' })} />
          </MenuItem>
        </Popover>
        <button
          className="langBtn"
          onClick={() => {
            if (lang == 'ar') {
              setLanguage('en')
            } else {
              setLanguage('ar')
            }
          }}
        >
          {/* <LanguageIcon /> */}
          <img src={lang == 'ar' ? unitedFlag : emiratesFlag} alt="flag" className="langFlag" />
        </button>
        <a href="https://miolawfirm.com/" target="_blank" className="logoLink">
          <img alt="logo" src={LogoImage} className="logoImg" />
        </a>

        {/* {<NotificationPopper {...{ clickAwayHandler, isOpen, setopencounter, counter, anchorEl, setAnchorEl }} />} */}
        {/* {<SendNotification />} */}
      </UserMenuContainer>
    </div>
  )
}

export default UserMenu
