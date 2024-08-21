import React, { useState } from 'react'
import { Fab, Grid, IconButton } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message'
import RemoveIcon from '@mui/icons-material/Remove'
import FriendList from '../FriendList/FriendList.styles'
import { useIntl } from 'react-intl'
import { usSignalRComponent } from '../SignalRComponent'

const ChatButton = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const intl = useIntl()

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState)
  }

  return (
    <Grid className={className}>
      {/* <SignalRComponent /> */}
      <Fab color="primary" onClick={toggleVisibility} className="chatButton">
        <MessageIcon />
      </Fab>
      {isVisible && (
        <Grid className="chatContainer">
          <Grid className="chatHeader">
            <Grid className="chatHeaderTitle">
              <span>{intl.formatMessage({ id: 'CHAT.HEADER' })}</span>
            </Grid>
            <Grid>
              <IconButton aria-label="remove" color="inherit" onClick={toggleVisibility}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid sx={{ height: '500px', position: 'relative' }}>
            <FriendList />
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default ChatButton
