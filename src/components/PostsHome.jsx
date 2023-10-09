import React, { useEffect, useState } from 'react'
import { buttons } from '../helpers/TailwindVar'
import useAuth from '../hooks/useAuth/'
import CardComments from './CardComments'
import { fetchComments, handlePostComment } from '../services/commentsFetch'
import { deletePost } from '../services/postsFetch'
import { Link } from 'react-router-dom'

export const PostsHome = ({ post }) => {
  const { auth } = useAuth()
  const [buttonDelette, setButtonDelette] = useState(false)
  const [comments, setcomments] = useState([])
  const [cargando, setCargando] = useState(true)
  const [comentario, setcomentario] = useState('')

  useEffect(() => {
    if (post.author === auth._id) { setButtonDelette(true) }
  }, [])

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchComments(post)
      setcomments(data)
      setCargando(false)
    }
    getPost()
  }, [])

  const setPost = () => {
    handlePostComment(post._id, comentario)
    setcomentario('')
  }
  const handleDeletePost = () => {
    deletePost(post._id)
  }

  return (

    <div className='flex flex-col gap-5 text-gray-700 dark:text-font1'>
      <div className='flex gap-3 items-center'>
        <div>
          <img
            width={100}
            height={100}
            className='w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-700'
            src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${post.image}`}
          />
        </div>
        <div className='flex justify-between w-full'>
          <Link
            to={`perfil/${post.author}`}
            className='font-bold'
          >
            {post.NameAuthor}
          </Link>
          {buttonDelette &&
            <button
              onClick={handleDeletePost}
              className='bg-red-400 text-white hover:bg-red-500 py-1 px-3 rounded'
            >Borrar
            </button>}
        </div>

      </div>
      <div className='bg-gray-100 dark:bg-neutral-800 rounded-lg p-3'>
        {post.content}
      </div>

      <div className='md:flex gap-2'>

        <input
          className='bg-gray-200 dark:bg-stone-800 py-3 px-3 w-full'
          type='text' placeholder='Comment'
          onChange={e => setcomentario(e.target.value)}
          value={comentario}
        />
        <button
          onClick={setPost}
          className={`${buttons}rounded py-3 px-4 mt-2 `}
        >Enviar
        </button>
      </div>

      <div className='flex flex-col gap-5'>
        {!cargando
          ? comments.map(comment => (

            <CardComments key={comment._id} comment={comment} />

          ))
          : <p>Cargando comentarios</p>}
      </div>

    </div>

  )
}
