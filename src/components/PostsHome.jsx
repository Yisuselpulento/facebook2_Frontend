import React, { useEffect, useState } from 'react'
import { buttons } from '../helpers/TailwindVar'
import useAuth from '../hooks/useAuth'
import usePosts from '../hooks/usePosts'

export const PostsHome = ({ post }) => {
  const { deletePost } = usePosts()
  const { auth } = useAuth()
  const [buttonDelette, setButtonDelette] = useState(false)

  useEffect(() => {
    if (post.author === auth._id) { setButtonDelette(true) }
  }, [])

  return (
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
        />
        <button className={`${buttons}rounded py-3 px-4 `}>Enviar</button>
      </div>

    </div>
  )
}
