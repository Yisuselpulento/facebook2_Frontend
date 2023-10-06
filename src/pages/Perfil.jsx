import React, { useState, useEffect } from 'react'
import { NavAuth } from '../components/NavAuth'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/clienteAxios'
import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'

export const Perfil = () => {
  const { auth } = useAuth()
  const [postUser, setpostUser] = useState([])
  const [cargando, setcargando] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios(`posts/${auth._id}`, config)
        setpostUser(data)
        setcargando(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPost()
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
