import { styled } from '@mui/material'
import Actionsbutton from './Actionsbutton'

const StyledActionsbutton = styled(Actionsbutton)(({ theme }) => ({
  position: 'relative',

  '&.MuiSpeedDial-directionLeft .MuiSpeedDial-actions': {
    position: 'absolute',
    right: theme.spacing(9),
    paddingRight: 0,
    backgroundColor: 'white',
    marginRight: 0,
    [theme.breakpoints.down('sm')]: {
      right: theme.spacing(1),
      position: 'relative',
      flexWrap: 'wrap',
      flex: 1,
    },
  },
  '&.MuiSpeedDial-directionLeft .MuiSpeedDial-actionsClosed': {
    display: 'none',
  },
  '& .viewIcon': {
    color: 'white',
    cursor: 'pointer',
  },
  '& .fab': {
    backgroundColor: theme.palette.primary,
    width: 40,
    height: 40,
    margin: '10px 0px',
    '&:hover': {
      backgroundColor: theme.palette.primary,
    },
  },
}))
export default StyledActionsbutton
