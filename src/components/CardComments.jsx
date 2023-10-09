import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { handleDeleteComment } from '../services/commentsFetch'
import { Link } from 'react-router-dom'

const CardComments = ({ comment }) => {
  const [buttonDeleted, setbuttonDeleted] = useState(false)

  const { auth } = useAuth()

  useEffect(() => {
    if (auth._id === comment.author._id) { setbuttonDeleted(true) }
  }, [])

  const deleteComment = () => {
    handleDeleteComment(comment._id)
  }
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <Link
          to={`perfil/${comment.author._id}`}
          className='text-font2 font-bold'
        >{comment.author.nombre}
        </Link>
        {buttonDeleted &&
          <button
            onClick={deleteComment}
            className='bg-red-400 text-white hover:bg-red-500 px-2 py-1 font-bold '
          >Borrar
          </button>}

      </div>

      <p className='bg-gray-100 dark:bg-neutral-800 p-2 rounded'>{comment.content}</p>

    </div>
  )
}

export default CardComments
