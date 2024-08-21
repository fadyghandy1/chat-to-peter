// SignalRComponent.js
import { useEffect, useState, useRef } from 'react'
import * as signalR from '@microsoft/signalr'
import { jwtDecode } from 'jwt-decode'

export const SignalRComponent = () => {
  const [users, setUsers] = useState([])
  const [connection, setConnection] = useState(null)
  // const [sendedMass, setSendedMass] = useState()
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN)
  // console.log(token, 'before decode')
  const decodedInfo = jwtDecode(token)
  const sendingMassege = useRef()
  console.log('decodedInfo')

  useEffect(() => {
    console.log('useaffect')

    // Create SignalR connection
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://45.246.204.69:90/ECaseNotificationService/chat', {
        withCredentials: false,

        accessTokenFactory: () => token, // If you need to send the token specifically
      })
      .withAutomaticReconnect()
      .build()

    setConnection(newConnection)
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('usersWithOnlineOfflineStatus', (users) => {
            setUsers(users) // Assuming `users` is an array of user data
          })

          connection.on('updateChatWithMyMessage', (ms) => {
            console.log(sendingMassege.current, 'ffff')

            sendingMassege.current = ms
            // setSendedMass(ms) // Assuming `users` is an array of user data
          })
        })
        .catch((error) => console.error('Connection failed: ', error))
    }

    // Cleanup connection on component unmount
    return () => {
      if (connection) {
        connection.stop()
      }
    }
  }, [connection])

  // Return the users data so it can be used in other components
  return { users, connection, setConnection, decodedInfo, sendingMassege }
}
