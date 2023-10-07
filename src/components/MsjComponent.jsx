import React from 'react'

export const MsjComponent = ({ msg }) => {
  return (
    <div>
      <p className='font-bold'>{msg.NameAuthor}</p>
      <p className='bg-gray-200 rounded-lg '>{msg.content}</p>
    </div>
  )
}
