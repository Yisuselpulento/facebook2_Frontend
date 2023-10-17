import { useState, createContext, useEffect } from 'react'
import { deletePost, fetchPost } from '../services/postsFetch'
import { handlePostComment } from '../services/commentsFetch'
import useAuth from '../hooks/useAuth'

const PostsContext = createContext({})

const PostsProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true)
  const [globalPost, setGlobalPost] = useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPost()
        setGlobalPost(data)
      } catch (error) {
        console.error('Error al obtener los posts:', error)
      } finally {
        setCargando(false)
      }
    }

    getPost()
  }, [])

  const handleDeletePost = (id) => {
    deletePost(id)
    const newArr = globalPost.filter(a => a._id !== id)
    setGlobalPost(newArr)
  }

  const newComment = async (postId, comentario) => {
    const Comentario = await handlePostComment(postId, comentario)
    if (Comentario) {
      setGlobalPost(prevPosts =>
        prevPosts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [Comentario, ...post.comments]
            }
          }
          return post
        })
      )
    }
  }

  const removeCommentFromState = (postId, commentId) => {
    setGlobalPost(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? { ...post, comments: post.comments.filter(comment => comment._id !== commentId) }
          : post
      )
    )
  }

  return (
    <PostsContext.Provider
      value={{
        cargando,
        setGlobalPost,
        globalPost,
        handleDeletePost,
        newComment,
        removeCommentFromState

      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export {
  PostsProvider
}

export default PostsContext
