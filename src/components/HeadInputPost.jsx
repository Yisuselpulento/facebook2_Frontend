import { useState } from 'react'
import { buttons } from '../helpers/TailwindVar'
import { Img } from '../assets/icons/iconos'
import useAuth from '../hooks/useAuth'
import { Postear } from '../services/postsFetch'

const HeadInputPost = () => {
  const [inputPost, setInputPost] = useState('')
  const { auth } = useAuth()

  const handleNewPost = () => {
    if (inputPost === '') return
    Postear(inputPost)
    setInputPost('')
  }

  return (
    <div className='bg-primary rounded h-[150px] mb-10  p-4 justify-center flex flex-col gap-5'>
      <div className='flex gap-5 items-center'>
        <div>
          <img
            className='w-16 h-16 rounded-full object-cover border border-gray-700'
            src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${auth.image}`}
          />
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
          className={`${buttons}font-bold py-3 px-5 rounded-full`}
        >POST
        </button>
      </div>

    </div>
  )
}

export default HeadInputPost
