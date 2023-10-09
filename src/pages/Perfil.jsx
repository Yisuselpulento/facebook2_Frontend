import React, { useState, useEffect } from 'react'
import { Aside } from '../components/Aside'
import HeadInputPost from '../components/HeadInputPost'
import useAuth from '../hooks/useAuth'
import { PostsHome } from '../components/PostsHome'
import { fetchPostUser } from '../services/postsFetch'

const Perfil = () => {
  const { auth } = useAuth()
  const [postUser, setpostUser] = useState([])
  const [cargando, setcargando] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchPostUser(auth._id)
      setpostUser(data)
      setcargando(false)
    }

    getUser()
  }, [])
  return (
    <div className='flex gap-10'>
      <Aside />
      <div>
        <HeadInputPost />
        {!cargando
          ? postUser.map(post => (
            <div key={post._id} className='bg-white shadow dark:bg-primary rounded p-4 mb-6  '>
              <PostsHome post={post} />
            </div>
          ))

          : <p className='text-font1'>Cargando...</p>}
      </div>

    </div>
  )
}

export default Perfil
