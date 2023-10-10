import React, { useState, useEffect } from 'react'
import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'
import { fetchPostUser } from '../services/postsFetch.js'
import { useParams } from 'react-router-dom'
import { fetchUserbyId } from '../services/userFetch.js'
import { CardPerfilDinamic } from '../components/CardPerfilDinamic'

export const PerfilDinamic = () => {
  const [postUser, setpostUser] = useState([])
  const [cargando, setcargando] = useState(true)
  const [usuario, setUsuario] = useState('')
  const user = useParams()

  useEffect(() => {
    const getUser = async () => {
      const newUser = await fetchUserbyId(user.id)
      setUsuario(newUser)
      const data = await fetchPostUser(newUser._id)
      setpostUser(data)
      setcargando(false)
    }

    getUser()
  }, [])

  return (

    <div className='flex gap-10 justify-center items-center md:justify-normal md:items-start  flex-col md:flex-row'>
      <CardPerfilDinamic usuario={usuario} />
      <div>
        <HeadInputPost placeholder='Dejale un post' />
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
