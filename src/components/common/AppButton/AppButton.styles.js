import { styled } from '@mui/material'
import AppButton from './AppButton'

const StyledButton = styled(AppButton)(({ theme }) => ({
  backgroundColor: theme.palette.orange.main,
  background: `-webkit-linear-gradient(${theme.palette.orange.main},${theme.palette.orange.dark})`,
  background: `-moz-linear-gradient(${theme.palette.orange.main},${theme.palette.orange.dark})`,
  background: `-ms-linear-gradient(${theme.palette.orange.main},${theme.palette.orange.dark})`,
  background: `-o-linear-gradient(${theme.palette.orange.main},${theme.palette.orange.dark})`,
  background: `linear-gradient(${theme.palette.orange.main},${theme.palette.orange.dark})`,
  boxShadow: 'none',
  border: 0,
  borderRadius: '21px',
  color: '#fff',
  // padding: '13px 38px',
  fontWeight: 700,
  fontSize: '20px',
  transition: '0.5s background ',
  '&:hover': {
    background: theme.palette.orange.dark,
  },
}))

export default StyledButton
