import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'
import { useState, useEffect } from 'react'
import { fetchPost } from '../services/postsFetch'

export const Home = () => {
  const [globalPost, setGlobalPost] = useState()
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
    <div className='static'>
      <HeadInputPost setGlobalPost={setGlobalPost} />
      {!cargando
        ? globalPost.map(post => (
          <div key={post._id} className='bg-white shadow dark:bg-primary rounded p-4 mb-6  '>
            <PostsHome post={post} />
          </div>
        ))

        : <p className='text-font1'>Cargando...</p>}
    </div>
  )
}
