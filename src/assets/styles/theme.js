import { createTheme } from '@mui/material'
import palette from './colors.scss'

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.orange,
    },
    pageBackground: {
      main: palette.pageBackground,
    },
    textMuted: {
      main: palette.textMuted,
    },
    lightgrey: {
      main: palette.lightgrey,
    },
    grey: {
      main: palette.grey,
      light: palette.lightgrey,
    },
    orange: {
      main: palette.orange,
      dark: palette.darkOrange,
    },
    // darkOrange: {
    //   main: palette.darkOrange,
    // },
  },
  typography: {
    fontFamily: `-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto"`,
  },
  // direction: 'rtl',
  // components: {
  //   MuiOutlinedInput: {
  //     styleOverrides: {
  //       option: {
  //         '&[aria-selected="true"]': {
  //           backgroundColor: '#e3abed',
  //         },

  //         '&:hover': {
  //           backgroundColor: '#9c27b0',
  //         },
  //         backgroundColor: 'red',
  //       },
  //     },
  //   },
  // },
})
