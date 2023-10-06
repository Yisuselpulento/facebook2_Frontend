import React, { useEffect, useState } from 'react'
import { buttons } from '../helpers/TailwindVar'
import useAuth from '../hooks/useAuth'
import usePosts from '../hooks/usePosts'
import clienteAxios from '../config/clienteAxios'
import CardComments from './CardComments'

export const PostsHome = ({ post }) => {
  const { deletePost } = usePosts()
  const { auth } = useAuth()
  const [buttonDelette, setButtonDelette] = useState(false)

  const [comments, setcomments] = useState([])
  const [cargando, setCargando] = useState(true)
  const [comentario, setcomentario] = useState('')

  useEffect(() => {
    if (post.author === auth._id) { setButtonDelette(true) }
  }, [])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const comentarios = await clienteAxios(`comments/${post._id}`, config)

        setcomments(comentarios.data)
        setCargando(false)
      } catch (error) {
        console.log(error.response.data)
      }
    }

    fetchComments()
  }, [comments])

  const handlePostComment = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      await clienteAxios.post(`comments/${post._id}`, { content: comentario }, config)
      setcomentario('')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-5 text-font1'>
        <div className='flex gap-3 items-center'>
          <div className='rounded-full bg-white h-10 w-10'>
            img
          </div>
          <div className='flex justify-between w-full'>
            <button className='font-bold'>
              {post.NameAuthor}
            </button>
            {buttonDelette && <button
              onClick={() => deletePost(post._id)}
              className='bg-red-400 py-1 px-3 rounded'
                              >Borrar
            </button>}
          </div>

        </div>
        <div className='bg-neutral-800 rounded-lg p-3'>
          {post.content}
        </div>

        <div className='md:flex gap-2'>

          <input
            className='bg-stone-800 py-3 px-3 w-full'
            type='text' placeholder='Comment'
            onChange={e => setcomentario(e.target.value)}
            value={comentario}
          />
          <button
            onClick={() => handlePostComment(post._id)}
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

    </div>

  )
}
