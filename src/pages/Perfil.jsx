import React, { useState, useEffect } from 'react'
import HeadInputPost from '../components/HeadInputPost'
import useAuth from '../hooks/useAuth'
import { PostsHome } from '../components/PostsHome'
import { fetchPostUser } from '../services/postsFetch'
import Spinner from '../components/Spinner'
import { CardPerfilDinamic } from '../components/CardPerfilDinamic'

const Perfil = () => {
  const { auth } = useAuth()
  const [postUser, setpostUser] = useState([])
  const [cargando, setcargando] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchPostUser(auth._id)
      if (Array.isArray(data)) {
        setpostUser(data)
      } else {
        console.error('Unexpected data:', data)
      }
      setcargando(false)
    }

    getUser()
  }, [])
  return (
    <div className='md:flex gap-8'>
      <div className='mb-10 md:mb-0'>

        <CardPerfilDinamic usuario={auth} />
      </div>
      <div>
        <HeadInputPost />
        {!cargando
          ? (
              postUser.length > 0
                ? (
                    postUser.map(post => (
                      <div key={post._id} className='bg-white shadow dark:bg-primary rounded p-4 mb-6'>
                        <PostsHome post={post} />
                      </div>
                    ))
                  )
                : (
                  <div className='text-center py-4 dark:text-gray-100'>No has escrito ningún post todavía.</div>
                  )
            )
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
