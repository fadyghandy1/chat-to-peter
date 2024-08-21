import { styled } from '@mui/material'
import AppField from './AppField'

const StyledAppField = styled(AppField)(({ theme, height = 50 }) => ({
  '& .MuiInputBase-root': { height: height },
  // '[dir="rtl"] &':{
  //   '.MuiFormLabel-root':{
  //     right: 0,
  //     left: 'unset',
  //     transform: 'translate(-16px, 16px) scale(1)',
  //     '&.Mui-focused':{
  //       right: 0,
  //     left: 'unset',
  //     transform: 'translate(16px, -9px) scale(0.75)',

  //     }
  //   }
  // }
}))

export default StyledAppField
