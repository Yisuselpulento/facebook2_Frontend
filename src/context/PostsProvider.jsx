import { useState, createContext, useEffect } from 'react'
import { deletePost, fetchPost, likePostFetch } from '../services/postsFetch'
import { handlePostComment } from '../services/commentsFetch'
import useAuth from '../hooks/useAuth'

const PostsContext = createContext({})

const PostsProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true)
  const [globalPost, setGlobalPost] = useState([])
  const { auth } = useAuth()

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPost()
        const updatedPosts = data.map(post => {
          const hasLiked = post.likes && post.likes.some(like => like.userId === auth._id)
          return {
            ...post,
            hasLiked
          }
        })

        setGlobalPost(updatedPosts)
        setCargando(false)
      } catch (error) {
        console.error('Error al obtener los posts:', error)
        setCargando(false)
      }
    }

    getPost()
  }, [auth?._id])

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

  // objeto like

  const handleLike = async (postId) => {
    try {
      const responseData = await likePostFetch(postId)
      if (responseData) {
        setGlobalPost(prevPosts =>
          prevPosts.map(post => {
            if (post._id === postId) {
              return {
                ...post,
                likes: responseData.likesUsers || [],
                hasLiked: responseData.hasLiked
              }
            }
            return post
          })
        )
      }
    } catch (error) {
      console.error('Error al dar like:', error)
    }
  }

  // objeto like

  return (
    <PostsContext.Provider
      value={{
        cargando,
        setGlobalPost,
        globalPost,
        handleDeletePost,
        newComment,
        removeCommentFromState,
        handleLike

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
