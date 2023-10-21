import React from 'react'
import useAuth from '../hooks/useAuth'

export const MsjComponent = ({ msg }) => {
  const { auth } = useAuth()
  const isSentByMe = auth?._id === msg.user?._id

  return (
    <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} w-full px-4`}>
      <div className={`flex flex-col ${isSentByMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <div className='flex gap-2'>
          {!isSentByMe && <img
            className='w-7 h-7 rounded-full object-cover border border-gray-300 dark:border-gray-700'
            src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${msg.user?.image}`}
                          />}
          <div>
            <p className=' text-gray-600 dark:text-gray-300'>{msg.user?.nombre}</p>
            <p className={`rounded-lg py-1 px-2 ${isSentByMe ? 'bg-green-400 text-black' : 'bg-white shadow dark:bg-gray-300 text-black'} break-all`}>
              {msg?.content}
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}
