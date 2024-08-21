import { useState, useEffect, useRef } from 'react'
import { SignalRComponent } from '../SignalRComponent'
import * as signalR from '@microsoft/signalr'
const Logic = (selectedUser) => {
  // console.log(selectedUser, 'selected user ')
  const { connection, setConnection, decodedInfo, sendedMass, sendingMassege } = SignalRComponent()
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState(true)

  // console.log(inputValue, 'input value ....')

  const handleSend = async (message) => {
    setData(false)
    const mess = {
      senderId: decodedInfo.nameid,
      recieverId: selectedUser.id,
      messageContent: message,
    }
    await connection
      .invoke('sendMessage', mess)
      .then(function () {
        if (sendingMassege.current) {
          console.log(sendingMassege.current, 'massege.current')
          setMessages((prevState) => [
            ...prevState,
            {
              props: {
                model: { message: sendingMassege?.current?.messageContent, sentTime: '15 mins ago', sender: 'Zoe', direction: 'outgoing', position: 'single' },
              },
            },
          ])

          setInputValue('')
        }
      })

      .catch(function (err) {
        return console.error(err.toString())
      })
    ////////////////////////////////////////////////////////////////////////////////////
  }
  const [messages, setMessages] = useState([
    {
      type: 'separator',
      props: {
        content: 'Saturday, 30 November 2019',
      },
    },
    {
      props: {
        model: { message: 'Hello my friend1', sentTime: '15 mins ago', sender: 'Eliot', direction: 'incoming', position: 'single' },
      },
    },
    {
      props: {
        model: { message: 'Hello my friend2', sentTime: '15 mins ago', sender: 'Zoe', direction: 'outgoing', position: 'single' },
      },
    },
    {
      props: {
        model: { message: 'Hello my friend3', sentTime: '15 mins ago', sender: 'Eliot', direction: 'incoming', position: 'single' },
      },
    },
    {
      props: {
        model: { message: 'Hello my friend4', sentTime: '15 mins ago', sender: 'Eliot', direction: 'incoming', position: 'single' },
      },
    },

    {
      type: 'separator',
      props: {
        content: 'Saturday, 31 November 2019',
      },
    },
    {
      props: {
        model: { message: 'Hello my friend', sentTime: '15 mins ago', sender: 'Eliot', direction: 'incoming', position: 'single' },
      },
    },
    {
      props: {
        model: { message: 'Hello my friend', sentTime: '15 mins ago', sender: 'Zoe', direction: 'outgoing', position: 'single' },
      },
    },

    {
      props: {
        model: { message: 'Hello my friend', sentTime: '15 mins ago', sender: 'Eliot', direction: 'incoming', position: 'single' },
      },
    },
    {
      props: {
        model: { message: 'Hello my friend', sentTime: '15 mins ago', sender: 'Eliot', direction: 'incoming', position: 'single' },
      },
    },
    {
      props: {
        model: { message: 'Hello my friend', sentTime: '15 mins ago', sender: 'Zoe', direction: 'outgoing', position: 'single' },
      },
    },
  ])
  return { messages, setMessages, handleSend, setInputValue }
}
export default Logic
