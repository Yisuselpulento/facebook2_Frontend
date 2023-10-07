import React, { useState } from 'react'
import Modal from 'react-modal'
import { buttons } from '../helpers/TailwindVar'
import { ChatIcon, GroupIcon, SendMsj } from '../assets/icons/iconos'

const ModalEdit = () => {
  const [modalIsOpen, setIsOpen] = useState(true)

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

  )
}

const ModalChat = () => {
  const [modalIsOpen, setIsOpen] = useState(true)

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
          <div className='h-[400px] bg-gray-100 p-3 '>
            <p>mensaje </p>
          </div>

          <div className='flex bg-gray-300 p-1 rounded-full gap-2 w-full'>
            <buttons className='bg-blue-700 rounded-full p-2'>
              <SendMsj color='white' />
            </buttons>
            <input
              placeholder='Mensaje'
              className='rounded-lg p-2 w-[250px]'
            />
          </div>

        </div>

        <button
          onClick={() => { setIsOpen(!modalIsOpen) }}
          className='bg-blue-700 rounded-full p-2 fixed right-1 bottom-1'
        ><ChatIcon color='gray' />
        </button>

      </div>

    </Modal>

  )
}

export {
  ModalEdit,
  ModalChat
}
