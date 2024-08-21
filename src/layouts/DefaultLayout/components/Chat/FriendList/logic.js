import React, { useCallback, useState } from 'react'
// import { getAllLookupTables, getCurrentAppVersion } from '../../services/CommonServices'
import { SignalRComponent } from '../SignalRComponent'

const Logic = () => {
  const { users } = SignalRComponent()
  const [selectedUser, setSelectedUser] = useState(null)

  // const [friendList, setFriendList] = useState([
  //   {
  //     lastSenderName: 'Lilly',
  //     unreadCnt: 3,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg',
  //   },
  //   {
  //     lastSenderName: 'Joe',
  //     unreadCnt: 0,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg',
  //   },
  //   {
  //     lastSenderName: 'Emily',
  //     unreadCnt: 3,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
  //   },
  //   {
  //     lastSenderName: 'Kai',
  //     unreadCnt: 0,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
  //   },
  //   {
  //     lastSenderName: 'Akane',
  //     unreadCnt: 0,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
  //   },
  //   {
  //     lastSenderName: 'Zoe',
  //     unreadCnt: 0,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
  //   },
  //   {
  //     lastSenderName: 'Patrik',
  //     unreadCnt: 0,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg',
  //   },
  //   {
  //     lastSenderName: 'Zoe',
  //     unreadCnt: 0,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
  //   },
  //   {
  //     lastSenderName: 'Patrik',
  //     unreadCnt: 0,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg',
  //   },
  //   {
  //     lastSenderName: 'Zoe',
  //     unreadCnt: 0,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
  //   },
  //   {
  //     lastSenderName: 'Patrik',
  //     unreadCnt: 0,
  //     lastMessage: 'Yes i can do it for you',
  //     photo: 'https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg',
  //   },
  // ])
  const handleBack = useCallback(() => {
    setSelectedUser(null)
  }, [])
  const handleConversationClick = (user) => {
    setSelectedUser(user)
    // console.log(user)
  }

  return { users, selectedUser, setSelectedUser, handleBack, handleConversationClick }
}
export default Logic
