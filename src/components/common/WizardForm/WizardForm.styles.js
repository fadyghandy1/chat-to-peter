import { styled } from '@mui/material'

export const StyledWizardHeader = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  border: `1px solid ${theme.palette.primary.main}`,
  background: '#fff',
  marginBottom: '16px',
  position: 'relative',
  padding: '0px 65px',
  '._btn': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: 0,
    '& svg': {
      '[dir="rtl"] &': {
        transform: 'rotate(180deg)',
      },
    },
    '&._btnBack': {
      left: 0,
    },
    '&._btnNext': {
      right: 0,
    },
  },
  '.MuiStepper-root': {
    padding: '20px 0',
    '.MuiStepConnector-alternativeLabel': {
      // '[dir="rtl"] &': {
      //   right: 'calc(-50% + 20px)',
      //   left: 'calc(50% + 20px)',
      // },
    },
    [theme.breakpoints.down('sm')]: {
      overflowX: 'auto',
      overflowY: 'hidden',
    },
  },
  // '.searchDrivingLicense,.renewDrivingLicense,.lostDrivingLicense,.damagedDrivingLicense': {
  //   marginTop: '16px',
  // },

  // '> .MuiStepper-root' :{
  //   flex: 1,
  //   '.MuiStep-root' :{
  //     padding: 0,
  //   }
  // }
  // '> ._btn': {
  //   borderRadius: 0,
  //   alignSelf: stretch,
  //   background: transparent !important,
  //   box-shadow: none !important,
  //   border: 1px solid rgba($color-orange, 0.5),
  //   color: $color-orange,
  //   min-width: 65px,
  //   flex-shrink: 0,

  //   &:hover {
  //     background: rgba($color-orange, 0.08) !important,
  //   }

  //   &._btnBack {
  //     margin: -1px 0 -1px -1px,
  //     padding: 6px 9px 6px 18px,
  //   }
  //   &._btnNext {
  //     margin: -1px -1px -1px 0,
  //   }
  // }
}))

export const StyledButton = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '14px',
}))
