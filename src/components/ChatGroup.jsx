import { useEffect, useState } from 'react'
import { GroupIcon, SendMsj, ChatIcon } from '../assets/icons/iconos'
import io from 'socket.io-client'
import { MsjComponent } from './MsjComponent'
import useAuth from '../hooks/useAuth'
import { fetchGetMessages, fetchPostMessage } from '../services/messagesFetch'
import OnlineGroup from './OnlineGroup'

const socketInstance = io(import.meta.env.VITE_BACKEND_URL)

const ChatGroup = () => {
  const { modalChat, setModalChat } = useAuth()
  const [chatGroup, setchatGroup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  useEffect(() => {
    const getMessages = async () => {
      const data = await fetchGetMessages()
      setChat(data)
    }

    getMessages()
  }, [])

  const sendMessage = async () => {
    setIsLoading(true)
    const data = await fetchPostMessage(message)

    socketInstance.emit('send_message', data)
    setMessage('')
    setIsLoading(false)
  }

  useEffect(() => {
    socketInstance.on('receive_message', data => {
      setChat(prevChat => [...prevChat, data])
    })

    return () => {
      socketInstance.off('receive_message', data => {
        setChat(prevChat => [...prevChat, data])
      })
    }
  }, [])

  return (

    <div className='flex gap-2 '>
      {chatGroup ? <OnlineGroup /> : <p>si</p>}
      <button
        onClick={() => setchatGroup(!chatGroup)}
        className='fixed top-2 left-2 w-10 h-10 bg-blue-700 rounded-full z-10 flex items-center justify-center'
      >
        <GroupIcon color='white' />
      </button>
      <div className='flex flex-col justify-between p-3 w-[345px] bg-gray-100 dark:bg-primary rounded-lg'>
        <div className='flex flex-col gap-3'>
          <div className='h-[420px] flex flex-col gap-2 overflow-auto'>
            {chat.map((msg, index) => (
              <MsjComponent msg={msg} key={index} isLoading={isLoading} />
            ))}
          </div>
          <div className='flex bg-gray-300 p-1 rounded-full gap-2 w-full items-center md:justify-center justify-start'>
            <button
              onClick={sendMessage}
              className='bg-blue-700 rounded-full p-1'
            >
              <SendMsj color='white' />
            </button>
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder='Mensaje'
              className='rounded-lg p-1 w-[300px]'
            />
          </div>

        </div>

      </div>
      <button
        onClick={() => setModalChat(!modalChat)}
        className='bg-blue-700 rounded-full p-2 md:p-4 fixed bottom-4 right-4'
      >
        <ChatIcon color='white' />
      </button>

    </div>

  )
}

export {
  ChatGroup
}
