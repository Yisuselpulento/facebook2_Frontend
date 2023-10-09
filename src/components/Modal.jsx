import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 p-3'>
      <div className='absolute inset-0 bg-black opacity-70' onClick={onClose} />
      <div className='bg-white p-1 md:p-6 rounded-lg shadow-lg relative w-full md:w-1/2'>
        <button onClick={onClose} className='bg-blue-700 rounded-full hover:bg-blue-800 p-1 m-3 text-white absolute top-2 right-2 font-bold text-2xl  focus:outline-none'>&times;</button>
        {children}
      </div>
    </div>
  )
}

export default Modal
