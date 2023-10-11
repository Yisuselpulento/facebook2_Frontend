import useAuth from '../hooks/useAuth'
import { handleDeleteComment } from '../services/commentsFetch'
import { Link } from 'react-router-dom'

const CardComments = ({ comment, removeComment }) => {
  const { auth } = useAuth()

  const shouldShowDeleteButton = auth._id === comment.author._id

  const deleteComment = () => {
    handleDeleteComment(comment._id)
      .then(() => {
        removeComment(comment._id)
      })
      .catch(error => {
        console.error('Hubo un error eliminando el comentario:', error)
      })
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <Link
          to={`perfil/${comment.author._id}`}
          className='text-font2 font-bold'
        >
          {comment.author.nombre}
        </Link>
        {shouldShowDeleteButton &&
          <button
            onClick={deleteComment}
            className='bg-red-400 text-white hover:bg-red-500 px-1 font-bold text-sm'
          >
            Borrar
          </button>}
      </div>
      <p className='bg-gray-100 dark:bg-neutral-800 p-2 rounded'>{comment.content}</p>
    </div>
  )
}

export default CardComments
