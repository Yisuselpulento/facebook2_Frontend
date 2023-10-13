import { useState, createContext, useEffect } from 'react'
import { deletePost, fetchPost } from '../services/postsFetch'
import { handlePostComment } from '../services/commentsFetch'

const PostsContext = createContext({})

const PostsProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true)
  const [globalPost, setGlobalPost] = useState([])

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPost()
      setGlobalPost(data)
      setCargando(false)
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

  /*
  const handleLike = async () => {
    const data = await likePostFetch(post._id)
    if (data && data.likesCount !== undefined) {
      setLike(data.hasLiked)
      setLikesCount(data.likesCount)
      if (data.hasLiked) {
        setLikes(prevLikes => [...prevLikes, { userId: auth._id, userName: auth.nombre, userImage: auth.image }])
      } else {
        setLikes(prevLikes => prevLikes.filter(like => like.userId !== auth._id))
      }
    }
  }

  useEffect(() => {
    const userHasLiked = post.likes && post.likes.some(like => like.userId === auth._id)
    setLike(userHasLiked)
  }, [post, auth._id])

 */

  return (
    <PostsContext.Provider
      value={{
        cargando,
        setGlobalPost,
        globalPost,
        handleDeletePost,
        newComment,
        removeCommentFromState
        /*     setLikes,
        likes
 */
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
