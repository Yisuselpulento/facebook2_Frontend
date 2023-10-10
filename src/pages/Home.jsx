import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'
import { useState, useEffect } from 'react'
import { fetchPost } from '../services/postsFetch'
import { Aside } from '../components/Aside'
import useAuth from '../hooks/useAuth'

export const Home = () => {
  const { globalPost, setGlobalPost } = useAuth()
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPost()
      setGlobalPost(data)
      setCargando(false)
    }

    getPost()
  }, [])

  return (
    <div className='flex gap-8'>
      <Aside />
      <div className='flex flex-col '>
        <HeadInputPost placeholder='Escribe algo' />
        {!cargando
          ? globalPost.map(post => (
            <div key={post._id} className='bg-white shadow dark:bg-primary rounded p-3 mb-5  '>
              <PostsHome post={post} />
            </div>
          ))

          : <p className='text-font1'>Cargando...</p>}

      </div>

    </div>
  )
}
