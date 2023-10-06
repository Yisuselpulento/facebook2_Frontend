import usePosts from '../hooks/usePosts'
import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'
import { ChatIcon } from '../assets/icons/iconos'
import ChatComponent from '../components/ChatComponent'
import { useState } from 'react'

export const Home = () => {
  const { globalPost, cargando } = usePosts()
  const [chatActive, setChatActive] = useState(false)

  return (
    <div className='static'>
      <HeadInputPost />
      {!cargando
        ? globalPost.map(post => (
          <div key={post._id} className='bg-primary rounded p-4 mb-6  '>
            <PostsHome post={post} />
          </div>
        ))

        : <p className='text-font1'>Cargando...</p>}
      <button
        onClick={() => setChatActive(!chatActive)}
        className='bg-blue-700 rounded-full p-3 md:p-4 fixed bottom-4 right-4'
      >
        <ChatIcon color='white' />
      </button>

    </div>
  )
}
