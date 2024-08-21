import { Drawer, styled } from '@mui/material'

import { drawerWidth } from '../../../../utils/constants/config'

const StyledAppDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
    background: theme.palette.primary.main,
    '[dir="rtl"] &': {
      left: 0,
    },
  },
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))
export default StyledAppDrawer
