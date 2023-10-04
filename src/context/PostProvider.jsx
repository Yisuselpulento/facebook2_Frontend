import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/clienteAxios'

const PostContext = createContext()

const PostProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true)
  const [newPost, setNewPost] = useState('')
  const [postsUser, setPostsUser] = useState([])
  const [globalPost, setGlobalPost] = useState([])

  const Postear = async (input) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      await clienteAxios.post('posts', { content: input }, config)
      setNewPost(input)
    } catch (error) {
      console.log(error)
    }
  }

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

        const { data } = await clienteAxios.get('posts', config)
        setGlobalPost(data)
        setCargando(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPost()
  }, [newPost])

  return (
    <PostContext.Provider
      value={{
        setNewPost,
        newPost,
        Postear,
        globalPost,
        cargando
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export {
  PostProvider
}

export default PostContext
