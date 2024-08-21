import { styled } from '@mui/material'
import ChatButton from './ChatButton'

const StyledChatButton = styled(ChatButton)(({ theme }) => ({
  zIndex: 2147483647,
  '& .chatButton': {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
  '& .chatContainer': {
    borderRadius: '10px',
    boxShadow: 'rgba(0, 0, 0, 0.5) 0 1px 5px 0', // Add the box shadow property here
    overflow: 'hidden',
    background: 'white',
    width: '25%',
    position: 'fixed',
    bottom: '13px', // Adjust this value to position the chat window above the chat button
    right: '18px',
    zIndex: 9999,
    // height: '40%',

    // maxHeight: '500px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      right: 0,
    },
    '& .chatHeader': {
      display: 'flex',
      flexWrap: 'wrap',
      background: '#15447a',
      height: '40px',
      alignContent: 'center',
      padding: '10px',

      color: ' #fff',
      '& .chatHeaderTitle': { flexGrow: 1, fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    },
  },
}))

export default StyledChatButton
