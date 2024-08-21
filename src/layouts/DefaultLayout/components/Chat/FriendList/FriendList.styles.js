import { styled } from '@mui/material'
import FriendList from './FriendList'

const StyledFriendList = styled(FriendList)(({ theme }) => ({
  width: '100%',
  zIndex: 2147483610,
  '& .cs-conversation__unread': {
    // height: '100%',
    // position: 'relative !important',
    right: '0.9em',
    left: 'unset',
  },
}))

export default StyledFriendList
