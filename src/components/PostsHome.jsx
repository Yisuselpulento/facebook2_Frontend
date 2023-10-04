import React from 'react'

export const PostsHome = ({ post }) => {
  return (
    <div className='flex flex-col gap-10 text-font1'>
      <div className='flex gap-3 items-center'>
        <div className='rounded-full bg-white h-10 w-10'>
          img
        </div>
        <button>
          {post.NameAuthor}
        </button>
      </div>
      <div>
        {post.content}
      </div>

      <div className='md:flex gap-2'>

        <input
          className='bg-stone-800 py-3 px-3 w-full'
          type='text' placeholder='Comment'
        />
        <button className='bg-blue-700 rounded py-3 px-4 hover:bg-blue-800'>Enviar</button>
      </div>

    </div>
  )
}
