import React from 'react'
import { ChatIcon } from '../assets/icons/iconos'

export const ButtonOpenModal = ({ handleActiveModal }) => {
  return (
    <button
      onClick={handleActiveModal}
      className='bg-blue-700 rounded-full p-3 md:p-4 fixed bottom-4 right-4'
    >
      <ChatIcon color='white' />
    </button>
  )
}
