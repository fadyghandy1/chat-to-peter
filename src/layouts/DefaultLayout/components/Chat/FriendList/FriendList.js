import React from 'react'
import { Avatar, ConversationList, Conversation } from '@chatscope/chat-ui-kit-react'
import Logic from './logic'
import ChatDetails from '../ChatDetails/ChatDetails.styles'

const FriendList = ({ className }) => {
  const { users, selectedUser, handleBack, handleConversationClick } = Logic()
  // users, setUsers, selectedUser,

  return (
    <>
      <ConversationList className={className}>
        {users.map((user, index) => (
          <Conversation key={index} info={user.lastMessage} lastSenderName="ghandy" name={`${user.firstName} ${user.lastName}`} unreadCnt={5} onClick={() => handleConversationClick(user)}>
            <Avatar name={`${user.firstName} ${user.lastName}`} src={user.avatarUrl || 'https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg'} status={user.isOnline ? 'available' : 'dnd'} />
          </Conversation>
        ))}
      </ConversationList>
      {selectedUser && <ChatDetails selectedUser={selectedUser} handleBack={handleBack} />}
    </>
  )
}

export default FriendList
