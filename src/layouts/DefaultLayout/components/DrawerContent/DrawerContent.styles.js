import { Accordion, AccordionDetails, AccordionSummary, Icon, List, styled } from '@mui/material'
import DrawerContent from './DrawerContent'

const StyledDrawerContent = styled(DrawerContent)(({ theme }) => ({ border: 'none', width: '100%', height: '100%', overflow: 'scroll', overflowX: 'hidden', overflowY: 'auto' }))
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  background: theme.palette.primary.main,

  '& > .drawerHeaderLogo': {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    '& img': {
      display: 'block',
      // width: '26px',
      margin: '0 7px 0 5px',
      height: '70px !important',
    },
    '& h1': {
      fontSize: '1rem',
      color: '#fff',
      fontWeight: 'bold',
    },
  },
  '& > .drawerHeaderBtn': {
    color: '#fff',
  },
}))
export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: '0 !important',
  background: 'transparent',
  boxShadow: 'none',

  '&:before': {
    background: theme.palette.secondary.main,
    opacity: 0.3,
  },
  '&:nth-of-type(2):before': {
    opacity: 1,
  },
  '&.Mui-expanded': {
    margin: 0,
  },
  '&.Mui-expanded:before': {
    opacity: 0.3,
  },
  '&.Mui-expanded:after': {
    display: 'block',
    background: theme.palette.secondary.main,
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    content: "''",
    opacity: 0.3,
    position: 'absolute',
    transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
}))
export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: '0',
  minHeight: '40px',

  '&:hover': {
    background: `rgba(0,0,0, 0.1)`,
  },
  '&:hover .MuiAccordionSummary-content': {
    color: '#fff',
  },
  '&:hover .MuiAccordionSummary-content .material-icons': {
    color: '#fff',
  },
  '&.Mui-expanded': {
    minHeight: 'auto',
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: '#fff',
    fontWeight: 'bold',
    '& .material-icons': {
      color: `${theme.palette.secondary.main} !important`,
    },
  },
  '&.Mui-expanded:after': {
    display: 'block',
    background: theme.palette.secondary.main,
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    content: "''",
    opacity: 0.3,
    position: 'absolute',
    transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  '& .MuiAccordionSummary-content': {
    fontSize: '15px',
    fontWeight: 'bold',
    margin: '12px 0',
    color: '#b0b2ca',
  },
  '& .MuiAccordionSummary-expandIconWrapper svg': {
    fontSize: '20px',
    color: theme.palette.secondary.main,
  },
  '& .MuiAccordionSummary-content.Mui-expanded': {
    color: '#fff',
    // '& svg': {
    //   color: theme.palette.secondary.main,
    // },
  },

  '& .Mui-expanded': {
    margin: '12px 0 !important',
  },
  '& .MuiAccordionSummary-expandIcon.Mui-expanded': {
    margin: '0 -12px 0 0',
  },

  '& .MuiButtonBase-root': {
    padding: '8px',
  },

  '& .itemIconMain': {
    minWidth: '22px',
    textAlign: 'center',
    margin: '0 8px 0 0',
    // '[dir="rtl"] &': {
    //   margin: '0 0 0 8px',
    // },
  },
}))
export const NavLinkIconMain = styled(Icon)(({ theme }) => ({
  // fontSize: '20px',
  color: '#b0b2ca',
}))
export const AccordionDetailsRoot = styled(AccordionDetails)(({ theme }) => ({
  display: 'block',
  padding: 0,
  background: `rgb(53 89 132)`,
}))
export const ListRoot = styled(List)(({ theme }) => ({
  padding: 0,
  '&.mainLink': {
    '& .MuiListItemIcon-root': {
      minWidth: '22px',
      textAlign: 'center',
      margin: '0 8px 0 0',
      // '[dir="rtl"] &': {
      //   margin: '0 0 0 8px',
      // },
    },
  },
  '& >.listItem': {
    borderRadius: '0',
    minHeight: '40px',
    color: '#cecfde',
    paddingLeft: '30px',
    paddingRight: '0',
    // '[dir="rtl"] &': {
    //   paddingRight: '30px',
    //   paddingLeft: '0',
    // },

    '&.item': {
      padding: '8px 16px',
    },
    '&:hover': {
      background: 'rgba(0,0,0,0.1)',
      color: '#fff',
      '& .material-icons': {
        color: '#cecfde',
      },
    },
    '& .MuiTypography-root': {
      fontWeight: 'bold',
      fontSize: '15px',
      lineHeight: '16px',
      textAlign: 'left',
      // '[dir="rtl"] &': {
      //   textAlign: 'right',
      // },
    },
    '& .itemIcon': {
      minWidth: '22px',
      textAlign: 'center',
      margin: '0 8px 0 0',
      // '[dir="rtl"] &': {
      //   margin: '0 0 0 8px',
      // },
    },
    '&.active': {
      backgroundColor: 'rgba(0,0,0,0.1)',
      color: '#fff',

      '& .material-icons': {
        color: theme.palette.secondary.main,
      },
      '&:hover': {
        '& .material-icons': {
          color: theme.palette.secondary.main,
        },
      },
    },
  },
  '&.mainLink >.listItem': {
    paddingLeft: '16px',
    // '[dir="rtl"] &': {
    //   paddingRight: '16px',
    //   paddingLeft: 0,
    // },
    '& .MuiListItemIcon-root': {
      minWidth: '22px',
      textAlign: 'center',
      margin: '0 8px 0 0',
      // '[dir="rtl"] &': {
      //   margin: '0 0 0 8px',
      // },
    },
  },
}))
export default StyledDrawerContent
