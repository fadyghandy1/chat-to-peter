import { styled } from '@mui/material'
import Login from './Login'
import image from '../../assets/images/Home_Page_Upper_Part_copy_1920x.webp'
import AppField from '../../components/common/AppField/AppField'

const StyledLogin = styled(Login)(({ theme }) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  width: '100vw',
  minHeight: '100vh',
  padding: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: 0,
  margin: 0,
  '& .leftSection': {
    flex: 1,
    textAlign: 'center',
    maxWidth: '395px',
    background: 'rgb(14, 47, 85,0.6)',
    padding: '30px 35px',
    borderRadius: '30px',
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  '& .leftSelection': {
    // maxWidth: '320px',
    margin: '0 auto',
    // padding: '60px 16px 30px',
  },
  '& .loginWrap': {
    display: 'flex',
    // maxWidth: '1280px',
    width: '100%',
    borderRadius: '0px',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  '& .slogan': {
    '& .s-text': {
      fontSize: 45,
      color: '#fff',
    },
    '& .s-history': {
      color: theme.palette.secondary.main,
      fontSize: 20,
      textAlign: 'center',
    },
  },
  // '&  .rightSection': {
  //   background: 'rgb(247,144,30)',
  //   color: theme.palette.primary.contrastText,
  //   flex: '1',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // '&  .rightP': {
  //   color: '#fff',
  // },
  // '&  .rightTitle': {
  //   fontSize: '3.2rem',
  //   fontWeight: '500',
  //   margin: '0 0 30px 0',
  // },
}))

export const StyledField = styled(AppField)(({ theme }) => ({
  // height: 50,
  // marginBottom: 10,
  '& .MuiOutlinedInput-root': {
    background: theme.palette.grey.light,
    '& fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
}))
export default StyledLogin
