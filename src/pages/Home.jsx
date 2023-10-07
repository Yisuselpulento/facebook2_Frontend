import usePosts from '../hooks/usePosts'
import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'
import { ChatIcon } from '../assets/icons/iconos'
import { useState } from 'react'
import { ModalChat } from '../components/ModalComponent'
import { ButtonOpenModal } from '../components/ButtonOpenModal'

export const Home = () => {
  const { globalPost, cargando } = usePosts()
  const [chatActive, setChatActive] = useState(false)

  const handleActiveModal = () => {
    setChatActive(!chatActive)
    console.log(chatActive)
  }

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
      <ButtonOpenModal handleActiveModal={handleActiveModal} />
      {chatActive && <ModalChat />}

    </div>
  )
}
