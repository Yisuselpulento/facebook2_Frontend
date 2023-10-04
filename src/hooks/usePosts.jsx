import { useContext } from 'react'
import PostContext from '../context/PostProvider'

const usePosts = () => {
  return useContext(PostContext)
}

export default usePosts
