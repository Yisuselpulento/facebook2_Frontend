import React from 'react'
import { buttons } from '../helpers/TailwindVar'

export const PostsHome = ({ post }) => {
  return (
    <div className='flex flex-col gap-5 text-font1'>
      <div className='flex gap-3 items-center'>
        <div className='rounded-full bg-white h-10 w-10'>
          img
        </div>
        <button className='font-bold'>
          {post.NameAuthor}
        </button>
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
