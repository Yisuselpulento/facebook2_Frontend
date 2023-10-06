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

  const deletePost = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      await clienteAxios.delete(`posts/${id}`, config)
    } catch (error) {
      console.log(error.response.data)
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

        const { data } = await clienteAxios('posts', config)
        setGlobalPost(data)
        setCargando(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPost()
  }, [globalPost])

  return (
    <PostContext.Provider
      value={{
        setNewPost,
        newPost,
        Postear,
        globalPost,
        cargando,
        deletePost
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
