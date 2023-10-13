import React from 'react'
import HeadInputPost from '../components/HeadInputPost'
import useAuth from '../hooks/useAuth'
import { PostsHome } from '../components/PostsHome'
import Spinner from '../components/Spinner'
import { CardPerfilDinamic } from '../components/CardPerfilDinamic'
import usePosts from '../hooks/usePosts'

const Perfil = () => {
  const { auth } = useAuth()
  const { globalPost } = usePosts()

  const userPosts = globalPost.filter(post => post.author && post.author._id === auth._id)

  return (
    <div className='md:flex gap-8'>
      <div className='mb-10 md:mb-0'>
        <CardPerfilDinamic usuario={auth} />
      </div>
      <div>
        <HeadInputPost />
        {userPosts.length
          ? userPosts.map(post => (
            <div key={post._id} className='bg-white shadow dark:bg-primary rounded p-4 mb-6'>
              <PostsHome post={post} />
            </div>
          ))
          : (
            <div className='flex items-center justify-center'>
              <Spinner />
            </div>
            )}
      </div>
    </div>
  )
}

export default Perfil
