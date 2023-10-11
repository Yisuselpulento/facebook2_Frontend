import { Link } from 'react-router-dom'
import { OffIcon } from '../assets/icons/iconos'
import SearchComponent from './SearchComponent'
import useAuth from '../hooks/useAuth'
import { buttons } from '../helpers/TailwindVar'
import ButtonTheme from './ButtonTheme'

export const NavAuth = () => {
  const { setAuth } = useAuth()

  const handleSesionClose = () => {
    setAuth({})
    localStorage.removeItem('token')
  }

  return (
    <div className='bg-white dark:bg-primary gap-4 shadow h-[50px] flex md:justify-between justify-center items-center p-3'>
      <Link
        to='/home'
        className='text-2xl font-bold text-blue-500 md:flex hidden'
      >Facebook2

      </Link>
      <div className='flex justify-center'>
        <SearchComponent />
      </div>

      <div className='flex  gap-3'>
        <ButtonTheme />
        <button
          onClick={handleSesionClose}
          className={`p-1 rounded-full  gap-2 ${buttons}  `}
        >
          <OffIcon color='white' />
        </button>
      </div>

    </div>
  )
}
