import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/clienteAxios'

const CardComments = ({ comment }) => {
  const [buttonDeleted, setbuttonDeleted] = useState(false)

  const { auth } = useAuth()

  useEffect(() => {
    if (auth._id === comment.author._id) { setbuttonDeleted(true) }
  }, [])

  const handleDeleteComment = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      await clienteAxios.delete(`comments/${id}`, config)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <p className='text-font2 font-bold'>{comment.author.nombre}</p>
        {buttonDeleted && <button
          onClick={() => handleDeleteComment(comment._id)}
          className='bg-red-400 px-2 py-1 font-bold '
                          >Borrar
                          </button>}

      </div>

      <p className='bg-neutral-800 p-2 rounded'>{comment.content}</p>

    </div>
  )
}

export default CardComments
