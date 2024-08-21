import { Box, Drawer, useTheme } from '@mui/material'
import { drawerWidth } from '../../../../utils/constants/config'
import StyledDrawerContent from '../DrawerContent/DrawerContent.styles'
import StyledAppDrawer from './AppDrawer.styles'
import { useLang } from '../../../../i18n/i18n'

const AppDrawer = ({ className, mobileOpen, handleDrawerToggle, openPersistentDrawer, handlePersistentDrawerClose, ...props }) => {
  console.log(props)
  const { window } = props
  const container = window !== undefined ? () => window().document.body : undefined
  const theme = useTheme()
  const lang = useLang()
  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <StyledAppDrawer
        container={container}
        variant="temporary"
        anchor={lang == 'ar' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <StyledDrawerContent handleDrawerClose={handleDrawerToggle} />
      </StyledAppDrawer>
      <StyledAppDrawer
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        anchor={lang == 'ar' ? 'right' : 'left'}
        variant="persistent"
        // dir="rtl"
        open={openPersistentDrawer}
      >
        <StyledDrawerContent handleDrawerClose={handlePersistentDrawerClose} />
      </StyledAppDrawer>
    </Box>
  )
}

export default AppDrawer
