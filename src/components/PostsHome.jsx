import React, { useEffect, useState } from 'react'
import { buttons } from '../helpers/TailwindVar'
import useAuth from '../hooks/useAuth/'
import CardComments from './CardComments'
import { fetchComments, handlePostComment } from '../services/commentsFetch'
import { deletePost, likePostFetch } from '../services/postsFetch'
import { Link } from 'react-router-dom'
import { HeartDislike, HeartLike } from '../assets/icons/iconos'

export const PostsHome = ({ post }) => {
  const { auth, globalPost, setGlobalPost } = useAuth()
  const [cargando, setCargando] = useState(true)
  const [comentario, setcomentario] = useState('')
  const [like, setLike] = useState()
  const [likes, setLikes] = useState(post.likes)
  const [mostrarLikes, setMostrarLikes] = useState(false)
  const [postComments, setPostComments] = useState([])

  const shouldShowDeleteButton = post.author._id === auth._id

  useEffect(() => {
    setLike(likes.includes(auth._id))
  }, [])

  const handleChangeLike = async () => {
    const data = await likePostFetch(post._id)
    if (data && data.likesCount !== undefined) {
      setLike(data.hasLiked)
      setLikes(prevLikes => data.hasLiked ? [...prevLikes, auth._id] : prevLikes.filter(id => id !== auth._id))
    }
  }

  useEffect(() => {
    const getComments = async () => {
      const data = await fetchComments(post)
      setPostComments(data)
      setCargando(false)
    }
    getComments()
  }, [])

  const submitComment = async () => {
    const newComment = await handlePostComment(post._id, comentario)
    console.log(newComment)

    if (newComment) {
      const augmentedComment = {
        ...newComment,
        author: {
          _id: auth._id,
          nombre: auth.nombre
        }
      }
      setPostComments(prevComments => [...prevComments, augmentedComment])
      setcomentario('')
    } else {
      console.error('Error al agregar el comentario')
    }
  }

  const handleDeletePost = () => {
    deletePost(post._id)
    const newArr = globalPost.filter(a => a._id !== post._id)
    setGlobalPost(newArr)
  }

  const removeCommentFromState = (commentId) => {
    const updatedComments = postComments.filter(c => c._id !== commentId)
    setPostComments(updatedComments)
  }

  return (

    <div className='flex flex-col gap-4 text-gray-700 dark:text-font1'>
      <div className='flex gap-3 items-center'>
        <div>
          <img
            width={100}
            height={100}
            className='w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-700'
            src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${post.author.image}`}
          />
        </div>
        <div className='flex justify-between w-full'>
          <Link
            to={`/perfil/${post.author._id}`}
            className='font-bold'
          >
            {post.author.nombre}
          </Link>
          {shouldShowDeleteButton && (
            <button
              onClick={handleDeletePost}
              className='bg-red-400 text-white hover:bg-red-500 px-2 rounded'
            >
              Borrar
            </button>
          )}
        </div>

      </div>
      <div className='bg-gray-100 dark:bg-neutral-800 rounded-lg p-2'>
        {post.content}
      </div>
      <div className='flex gap-2'>
        <button onClick={handleChangeLike}>
          {like ? <HeartLike color='red' /> : <HeartDislike />}
        </button>
        <p
          className='cursor pointer outline-2'
          onMouseEnter={() => setMostrarLikes(true)}
          onMouseLeave={() => setMostrarLikes(false)}
        >{likes.length}
        </p>
        {mostrarLikes && (
          <div className='absolute z-10 mt-2 w-56 p-4 bg-black rounded shadow-xl transition-opacity opacity-100'>
            {likes.map((like, index) => (
              <div key={index}>{like}</div>
            ))}
          </div>
        )}
      </div>

      <div className='md:flex gap-1 items-center'>

        <input
          className='bg-gray-200 dark:bg-stone-800 px-2 w-full h-10'
          type='text' placeholder='Comenta'
          onChange={e => setcomentario(e.target.value)}
          value={comentario}
        />
        <button
          onClick={submitComment}
          className={`${buttons}rounded py-2 px-3 mt-2 md:mt-0`}
        >Enviar
        </button>
      </div>

      <div className='flex flex-col gap-5'>
        {!cargando
          ? postComments.map(comment => (

            <CardComments
              key={comment._id} comment={comment}
              removeComment={removeCommentFromState}
            />

          ))
          : <p>Cargando comentarios</p>}
      </div>

    </div>

  )
}
