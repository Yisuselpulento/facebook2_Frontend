import { useEffect, useState } from 'react'
import { GroupIcon, SendMsj, ChatIcon } from '../assets/icons/iconos'
import io from 'socket.io-client'
import { MsjComponent } from './MsjComponent'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

const socketInstance = io(import.meta.env.VITE_BACKEND_URL)

const ChatGroup = () => {
  const { modal, setModal } = useAuth()
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
      console.log(data)
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
      <div className='w-[330px] h-[460px] flex flex-col justify-between static'>
        <button className='bg-blue-700 p-2 rounded-full fixed left-1 top-1'>
          <GroupIcon color='white' />
        </button>
        <div className='flex flex-col gap-3'>
          <div className='h-[400px] bg-gray-100 p-3 flex flex-col gap-2 overflow-auto'>
            {chat.map((msg, index) => (
              <MsjComponent msg={msg} key={index} />
            ))}
          </div>

          <div className='flex bg-gray-300 p-1 rounded-full gap-2 w-full'>
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
        onClick={() => setModal(!modal)}
        className='bg-blue-700 rounded-full p-3 md:p-4 fixed bottom-4 right-4'
      >
        <ChatIcon color='white' />
      </button>

    </div>

  )
}

export {
  ChatGroup
}
