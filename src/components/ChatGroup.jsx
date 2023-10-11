import { useEffect, useState } from 'react'
import { GroupIcon, SendMsj, ChatIcon } from '../assets/icons/iconos'
import io from 'socket.io-client'
import { MsjComponent } from './MsjComponent'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

const socketInstance = io(import.meta.env.VITE_BACKEND_URL)

const ChatGroup = () => {
  const { modalChat, setModalChat } = useAuth()
  // socket io
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  // socket
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios('messages', config)
        setChat(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMessages()
  }, [])

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('messages', { content: message }, config)
      socketInstance.emit('send_message', data)
      setChat(prevChat => [...prevChat, data])
      setMessage('')
    } catch (error) {
      console.log(error)
    }
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

    <div>

      <div className='flex flex-col justify-between p-3 w-full dark:bg-primary rounded-lg'>

        <div className='flex flex-col gap-3'>
          <div className='h-[420px] p-3 flex flex-col gap-2 overflow-auto'>
            {chat.map((msg, index) => (
              <MsjComponent msg={msg} key={index} />
            ))}
          </div>

          <div className='flex bg-gray-300 p-1 rounded-full gap-2 w-full items-center justify-center'>
            <button
              onClick={sendMessage}
              className='bg-blue-700 rounded-full p-2'
            >
              <SendMsj color='white' />
            </button>
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder='Mensaje'
              className='rounded-lg p-2 w-[250px]'
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
