import React, { useState } from 'react'
import { buttons } from '../helpers/TailwindVar'
import useAuth from '../hooks/useAuth/'
import CardComments from './CardComments'
import { likePostFetch } from '../services/postsFetch'
import { Link } from 'react-router-dom'
import { HeartDislike, HeartLike } from '../assets/icons/iconos'
import usePosts from '../hooks/usePosts'

export const PostsHome = ({ post, onDelete }) => {
  const { auth } = useAuth()
  const { handleDeletePost, cargando, newComment } = usePosts()
  const [comentario, setComentario] = useState('')
  const [likesCount, setLikesCount] = useState(post.likes ? post.likes.length : 0)

  const { author, content, likes, _id, comments } = post

  const shouldShowDeleteButton = author._id === auth._id

  /*

  const currentPostLikes = likes.filter(like => like.postId === post._id) */

  return (

    <div className='flex flex-col gap-3 text-gray-700 dark:text-font1'>
      <div className='flex gap-2 items-center'>
        <div>
          <img
            width={100}
            height={100}
            className='w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-700'
            src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${author.image}`}
          />
        </div>
        <div className='flex justify-between text-sm w-full'>
          <Link
            to={`/perfil/${author._id}`}
            className='font-bold'
          >
            {author.nombre}
          </Link>
          {shouldShowDeleteButton && (
            <button
              onClick={() => handleDeletePost(_id)}
              className='bg-red-400 text-white hover:bg-red-500 px-2 rounded'
            >
              Borrar
            </button>
          )}
        </div>

      </div>
      <div className='bg-gray-100 dark:bg-neutral-800 rounded-lg p-2'>
        {content}
      </div>
      {/*    <div className='flex gap-2'>
        <button onClick={handleLike}>
          {like ? <HeartLike color='red' /> : <HeartDislike />}
        </button>

        <div
          onMouseEnter={() => setMostrarLikes(true)}
          onMouseLeave={() => setMostrarLikes(false)}
        >
          <p className='cursor pointer outline-2'>{likesCount}</p>
          {mostrarLikes && (
            <div className='absolute z-10 mt-6 p-4 bg-black rounded shadow-xl transition-opacity opacity-100'>
              {currentPostLikes.map((like, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <img
                    width={20}
                    height={20}
                    className='rounded-full object-cover border border-gray-300 dark:border-gray-700'
                    src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${like.userImage}`}
                    alt={like.userName}
                  />
                  <span>{like.userName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}

      <div className='md:flex gap-1 items-center'>

        <input
          className='bg-gray-200 dark:bg-stone-800 px-2 w-full h-10'
          type='text' placeholder='Comenta'
          onChange={e => setComentario(e.target.value)}
          value={comentario}
        />
        <button
          onClick={() => {
            newComment(_id, comentario)
            setComentario('')
          }}
          className={`${buttons}rounded py-1 px-2 mt-2 md:mt-0`}
        >
          Enviar
        </button>
      </div>

      <div className='flex flex-col gap-5'>
        {!cargando
          ? comments.map(comment => (

            <CardComments
              key={comment._id} comment={comment}
           /*    removeComment={removeCommentFromState}  */
            />

          ))
          : <p>Cargando comentarios</p>}
      </div>

    </div>

  )
}
