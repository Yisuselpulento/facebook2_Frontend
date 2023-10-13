import { useState, useEffect } from 'react'
import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'
import { useParams } from 'react-router-dom'
import { CardPerfilDinamic } from '../components/CardPerfilDinamic'
import Spinner from '../components/Spinner'
import usePosts from '../hooks/usePosts'
import { fetchUserbyId } from '../services/userFetch'

export const PerfilDinamic = () => {
  const { userId } = useParams()
  const { globalPost } = usePosts()
  const [usuario, setUsuario] = useState()
  const [cargando, setcargando] = useState(true)

  const userPosts = globalPost.filter(post => post.author._id === userId)

  useEffect(() => {
    const getUser = async () => {
      const newUser = await fetchUserbyId(userId)
      setUsuario(newUser)
      setcargando(false)
      console.log(newUser)
    }

    getUser()
  }, [])

  if (cargando) return 'cargando'
  return (
    <div className='flex gap-10 justify-center  md:justify-normal md:items-start  flex-col md:flex-row'>
      <CardPerfilDinamic usuario={usuario} />
      <div>
        <HeadInputPost placeholder='Dejale un post' />
        {userPosts.length > 0
          ? userPosts.map(post => (
            <div key={post._id} className='bg-white shadow dark:bg-primary rounded p-4 mb-6'>
              <PostsHome post={post} />
            </div>
          ))
          : <div className='flex items-center justify-center'>
            <Spinner />
            </div>}
      </div>
    </div>
  )
}
