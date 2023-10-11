import React from 'react'
import useAuth from '../hooks/useAuth'

export const MsjComponent = ({ msg }) => {
  const { auth } = useAuth()
  const isSentByMe = auth._id === msg.user._id

  console.log(msg)
  return (
    <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} w-full px-4`}>
      <div className={`flex flex-col ${isSentByMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <p className='font-bold text-gray-300'>{msg.user.nombre}</p>
        <p className={`rounded-lg py-1 px-2 ${isSentByMe ? 'bg-green-400 text-black' : 'bg-gray-300 text-black'} break-all`}>
          {msg.content}
        </p>
      </div>
    </div>
  )
}
