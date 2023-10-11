import React from 'react'
import useAuth from '../hooks/useAuth'

export const MsjComponent = ({ msg }) => {
  const { auth } = useAuth()
  const isSentByMe = auth._id === msg.user._id

  console.log(isSentByMe)
  return (
    <div className={`flex flex-col ${isSentByMe ? 'items-end' : ''}`}>
      <p className='font-semibold text-sm text-gray-300'>{msg.NameAuthor}</p>
      <p className={`text-sm rounded-lg p-2 ${isSentByMe ? 'bg-green-400 text-black' : 'bg-gray-600 text-white'} break-all max-w-[80%]`}>
        {msg.content}
      </p>
    </div>
  )
}
