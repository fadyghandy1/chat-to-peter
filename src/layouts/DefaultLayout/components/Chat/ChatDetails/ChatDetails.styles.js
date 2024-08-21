import { styled } from '@mui/material'
import ChatDetails from './ChatDetails'
import { keyframes } from '@emotion/react'

// Define the keyframes
const exampleAnimation = keyframes`
  0% { left: ; bottom: 100px; }
  25% { left: 0px; top: 50px; }
  50% { left: 0px; top: 10px; }
  100% { left: 0px; top: 0px; }
`

const StyledChatDetails = styled(ChatDetails)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '100%',
  zIndex: 2147483640,
  animation: `${exampleAnimation} 20ms `,
}))

export default StyledChatDetails
