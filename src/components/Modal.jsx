import React from 'react'
import useAuth from '../hooks/useAuth'

const Modal = ({ isOpen, onClose, children }) => {
  const { color } = useAuth()
  const colorIcon = color === 'white' ? 'black' : 'white'
  const colorBack = color === 'black' ? 'black' : 'white'

  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 p-1'>
      <div className={`absolute inset-0 bg-${colorIcon} opacity-70`} onClick={onClose} />
      <div className='md:p-6 rounded-lg shadow-lg relative w-full md:w-1/2'>
        <button onClick={onClose} className={`  m-1 text-${colorBack} absolute top-0 right-5 text-3xl  focus:outline-none`}>&times;</button>
        {children}
      </div>
    </div>
  )
}

export default Modal
