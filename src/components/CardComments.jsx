import useAuth from '../hooks/useAuth'
import usePosts from '../hooks/usePosts'
import { handleDeleteComment } from '../services/commentsFetch'
import { Link } from 'react-router-dom'

const CardComments = ({ comment }) => {
  const { auth } = useAuth()
  const { removeCommentFromState } = usePosts()
  const { author, content, _id, post } = comment
  const shouldShowDeleteButton = auth._id === comment.author._id

  const deleteComment = async () => {
    try {
      await handleDeleteComment(_id)
      removeCommentFromState(post, _id)
    } catch (error) {
      console.error('Error al eliminar comentario:', error)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <Link
          to={`perfil/${author._id}`}
          className='text-font2 font-bold'
        >
          {author.nombre}
        </Link>
        {shouldShowDeleteButton &&
          <button
            onClick={deleteComment}
            className='bg-red-400 text-white hover:bg-red-500 px-1 font-bold text-sm'
          >
            Borrar
          </button>}
      </div>
      <p className='bg-gray-100 dark:bg-neutral-800 p-2 rounded'>{content}</p>
    </div>
  )
}

export default CardComments
