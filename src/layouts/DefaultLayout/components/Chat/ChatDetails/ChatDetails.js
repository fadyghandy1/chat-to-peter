import React, { useState } from 'react'

import { Avatar, ChatContainer, MainContainer, ConversationHeader, MessageList, Message, MessageSeparator, MessageInput } from '@chatscope/chat-ui-kit-react'
import Logic from './Logic'

const ChatDetails = ({ selectedUser, handleBack, className }) => {
  const { messages, handleSend, setInputValue, inputValue, sendedMass } = Logic(selectedUser)

  return (
    <div className={className}>
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back onClick={handleBack} />
            <Avatar name={`${selectedUser.firstName} ${selectedUser.lastName}`} src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg" />
            <ConversationHeader.Content userName={`${selectedUser.firstName} ${selectedUser.lastName}`} />
          </ConversationHeader>
          <MessageList style={{ height: '500px' }}>{messages.map((m, i) => (m.type === 'separator' ? <MessageSeparator key={i} {...m.props} /> : <Message key={i} {...m.props} />))}</MessageList>
          <MessageInput placeholder="Type message here" value={inputValue} onChange={(e) => setInputValue(e)} onSend={handleSend} attachButton={false} />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default ChatDetails
