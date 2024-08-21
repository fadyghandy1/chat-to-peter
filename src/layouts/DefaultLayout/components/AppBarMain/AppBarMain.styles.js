import { IconButton, styled } from '@mui/material'
import AppBarMain from './AppBarMain'
import { drawerWidth } from '../../../../utils/constants/config'

const StyledAppBarMain = styled(AppBarMain)(({ theme, openPersistentDrawer }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: '#fff',
  boxShadow: 'none',
  ...(openPersistentDrawer && {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      // '[dir="rtl"] &': {
      //   marginRight: `${drawerWidth}px`,
      //   marginLeft: 0,
      // },
    },
  }),
  '& .css-r8b5xo': {
    // '[dir="rtl"] &': {
    //   marginRight: 'auto',
    //   marginLeft: 0,
    // },
  },
  '& .toolbar': {
    // minHeight: `${appBarHeight}`
  },
}))
export const UserMenuContainer = styled('div')(({ theme }) => ({
  flex: 1,
  width: '100%',
  overflow: 'hidden',
}))
export const MenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  paddingLeft: 0,
  paddingRight: 0,
  marginRight: '10px',
  // '[dir="rtl"] &': {
  //   marginRight: 0,
  //   marginLeft: '10px',
  // },
}))
export default StyledAppBarMain
