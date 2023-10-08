import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'
import { fetchPostUser } from '../services/postsFetch'

export const Perfil = () => {
  const { auth } = useAuth()
  const [postUser, setpostUser] = useState([])
  const [cargando, setcargando] = useState(true)

  useEffect(() => {
    const PostPerfil = async () => {
      const data = await fetchPostUser(auth._id)
      setpostUser(data)
      setcargando(false)
    }

    PostPerfil()
  }, [postUser])

  return (

    <div>
      <HeadInputPost />
      {!cargando
        ? postUser.map(post => (
          <div key={post._id} className='bg-primary rounded p-4 mb-6  '>
            <PostsHome post={post} />
          </div>
        ))

        : <p className='text-font1'>Cargando...</p>}
    </div>
  )
}
