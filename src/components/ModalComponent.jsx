import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { buttons } from '../helpers/TailwindVar'
import { ChatIcon, GroupIcon, SendMsj } from '../assets/icons/iconos'
// pasar a un componente todo lo de coket
import io from 'socket.io-client'
import { MsjComponent } from './MsjComponent'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'
import { ButtonOpenModal } from './ButtonOpenModal'

const ModalEdit = () => {
  /* const [modalIsOpen, setIsOpen] = useState(true)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  Modal.setAppElement('#root')
  return (

    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
    >
      <div className='flex flex-col items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <div className='border border-blue-500 rounded-full w-[100px] h-[100px] text-center'>img</div>
          <div className='flex flex-col gap-1'>
            <p>Nick</p>
            <a>Editar</a>
          </div>

        </div>
        <div className='flex gap-20'>
          <div className='flex flex-col gap-3'>
            <p>Sexo:</p>
            <p>Edad:</p>
            <p>Pais:</p>
          </div>
          <div className='flex flex-col gap-3'>
            <p>Superior</p>
            <p>20</p>
            <p>Chile</p>
          </div>
        </div>
        <button
          onClick={() => { setIsOpen(!modalIsOpen) }}
          className={`px-3 py-2 rounded ${buttons} `}
        >Guardar
        </button>

      </div>

    </Modal>

  ) */
}

// todo el componente
const ModalChat = () => {
  const [modalIsOpen, setIsOpen] = useState(true)

  // socket io
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const { auth } = useAuth()
  const [socket, setSocket] = useState(null)

  // socket
  useEffect(() => {
    console.log(auth)
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

    // soket io
    if (socket) {
      return
    }

    const socketInstance = io(import.meta.env.VITE_BACKEND_URL)
    socketInstance.on('receive_message', data => {
      setChat(oldChat => [...oldChat, data])
    })
    setSocket(socketInstance)
    return () => socketInstance.disconnect()
  }, [])

  const sendMessage = async () => {
    const userData = {
      content: message,
      user: auth._id,
      name: auth.nombre
    }

    /*   try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('messages', userData, config)
      setChat(prevChat => [...prevChat, data])
    } catch (error) {
      console.log(error)
    } */

    socket.emit('send_message', userData)
    setMessage('')
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  Modal.setAppElement('#root')
  return (

    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
    >
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

        <buttons onClick={() => setIsOpen(false)}>
          <ButtonOpenModal />
        </buttons>

      </div>

    </Modal>

  )
}

export {
  ModalEdit,
  ModalChat
}
