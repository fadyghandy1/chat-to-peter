import { styled } from '@mui/material'
import DefaultLayoutContainer from './DefaultLayout'
import { drawerWidth } from '../../utils/constants/config'

const StyledDefaultLayout = styled(DefaultLayoutContainer)(({ theme }) => ({}))
export const Main = styled('main')(({ theme, openPersistentDrawer, isExistFavorite }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  width: 'fit-content',
  overflow: 'auto',
  paddingTop: '4em',
  // paddingTop: 'var(--header-height, 60px)',
  background: theme.palette.pageBackground.main,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: `-${drawerWidth}px`,
    // '[dir="rtl"] &': {
    //   marginRight: `-${drawerWidth}px`,
    //   marginLeft: 0,
    // },
  },
  ...(isExistFavorite && {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '7em',
    },
  }),
  ...(openPersistentDrawer && {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),

      marginLeft: 0,
      // '[dir="rtl"] &': {
      //   marginRight: 0,
      // },
    },
  }),
}))
export default StyledDefaultLayout
