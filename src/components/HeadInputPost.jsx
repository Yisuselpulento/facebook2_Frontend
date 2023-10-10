import { useState } from 'react'
import { buttons } from '../helpers/TailwindVar'
import { Img } from '../assets/icons/iconos'
import useAuth from '../hooks/useAuth'
import { Postear } from '../services/postsFetch'

const HeadInputPost = ({ placeholder }) => {
  const [inputPost, setInputPost] = useState('')
  const { auth, setGlobalPost } = useAuth()

  const handleNewPost = async () => {
    if (inputPost === '') return
    const data = await Postear(inputPost)
    setGlobalPost(prevPosts => [data, ...prevPosts])
    setInputPost('')
  }

  return (
    <div className='bg-white shadow dark:bg-primary rounded h-[135px] mb-10 md:w-[620px]  p-4 justify-center flex flex-col gap-5'>
      <div className='flex gap-5 items-center'>
        <div>
          <img
            className='w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-700'
            src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${auth.image}`}
          />
        </div>
        <input
          type='text' placeholder={placeholder} className='bg-gray-200 dark:bg-neutral-800 rounded-full h-[45px] w-full p-4 text-font1'
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
          className={`${buttons}font-semibold py-2 px-3 rounded-full`}
        >Post
        </button>
      </div>

    </div>
  )
}

export default HeadInputPost
