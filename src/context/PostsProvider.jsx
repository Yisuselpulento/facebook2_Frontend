import { useState, createContext, useEffect } from 'react'
import { deletePost, fetchPost } from '../services/postsFetch'
import { fetchComments } from '../services/commentsFetch'

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

  useEffect(() => {
    const getComments = async () => {
      const data = await fetchComments(post)
      setPostComments(data)
      setCargando(false)
    }
    getComments()
  }, [])

  const submitComment = async () => {
    const newComment = await handlePostComment(post._id, comentario)

    if (newComment) {
      const augmentedComment = {
        ...newComment,
        author: {
          _id: auth._id,
          nombre: auth.nombre
        }
      }
      setPostComments(prevComments => [...prevComments, augmentedComment])
      setcomentario('')
    } else {
      console.error('Error al agregar el comentario')
    }
  }

  const removeCommentFromState = (commentId) => {
    const updatedComments = postComments.filter(c => c._id !== commentId)
    setPostComments(updatedComments)
  } */

  return (
    <PostsContext.Provider
      value={{
        cargando,
        setGlobalPost,
        globalPost,
        handleDeletePost
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
