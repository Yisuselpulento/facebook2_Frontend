import useAuth from '../hooks/useAuth'
import { Img } from '../assets/icons/iconos'
import usePosts from '../hooks/usePosts'
import { PostsHome } from '../components/PostsHome'
import { useState } from 'react'
import Modal from '../components/Modal'

export const Home = () => {
  const [inputPost, setInputPost] = useState('')

  const { Postear, globalPost, cargando } = usePosts()
  const { setAuth } = useAuth()

  const handleSesionClose = () => {
    setAuth({})
    localStorage.removeItem('token')
  }

  const handleNewPost = async () => {
    if (inputPost === '') return

    await Postear(inputPost)
    setInputPost('')
  }

  return (
    <div>
      <div className='bg-primary rounded h-[150px] mb-10  p-4 justify-center flex flex-col gap-5'>
        <div className='flex gap-5'>
          <div className='h-[55px] w-[55px] bg-gray-300 rounded-full '>
            FJH
          </div>
          <input
            type='text' placeholder='Write here...' className='bg-neutral-800 rounded-full h-[55px] w-full p-5 text-font1'
            value={inputPost}
            onChange={e => setInputPost(e.target.value)}
          />

        </div>
        <div className='flex justify-between items-center'>
          <button>
            <Img color='white' />
          </button>

          <button
            onClick={handleNewPost}
            className='text-font1 font-bold bg-blue-700 hover:bg-blue-800 py-3 px-5 rounded-full'
          >POST
          </button>
        </div>

      </div>

      {!cargando
        ? globalPost.map(post => (
          <div key={post._id} className='bg-primary rounded p-4 mb-6  '>
            <PostsHome post={post} />
          </div>
        ))

        : <p className='text-font1'>Cargando...</p>}

      <button
        onClick={handleSesionClose}
        className='p-20 bg-black text-white hover:bg-green-500 hover:text-pink-400 text-5xl'
      >CERRAR SESION
      </button>

    </div>
  )
}
