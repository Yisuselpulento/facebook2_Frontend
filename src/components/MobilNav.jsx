import { Link } from 'react-router-dom'
import { ChatIcon, Config, HomeIcon, PerfilIcon } from '../assets/icons/iconos'
import useAuth from '../hooks/useAuth'

const MobilNav = () => {
  const { setModalEdit, modalEdit, modalChat, setModalChat } = useAuth()

  const buttons = 'hover:bg-black px-1 w-full py-1 rounded-lg hover:bg-blue-800 flex items-center justify-center'

  return (
    <div className='flex md:hidden bg-gray-800 dark:bg-secundary w-full h-16 rounded-t-md text-white fixed bottom-0 left-0  justify-between  gap-3 '>
      <Link
        className={buttons}
        to='/home'
      >
        <HomeIcon color='white' />
      </Link>
      <Link
        className={buttons}
        to='/perfil'
      >
        <PerfilIcon color='white' />
      </Link>
      <button
        className={buttons}
        onClick={() => setModalEdit(!modalEdit)}
      >
        <Config color='white' />
      </button>
      <button
        onClick={() => setModalChat(!modalChat)}
        className={buttons}
      >
        <ChatIcon color='white' />
      </button>

    </div>
  )
}

export default MobilNav
