import { Link } from 'react-router-dom'
import { Sun, Moon, Question, SessionOut } from '../assets/icons/iconos'
import { useState } from 'react'
import SearchComponent from './SearchComponent'
import useAuth from '../hooks/useAuth'
import { buttons } from '../helpers/TailwindVar'

export const NavAuth = () => {
  const [ModeNocturne, setModeNocturne] = useState(true)

  const handleChangeMode = () => {
    setModeNocturne(!ModeNocturne)
  }

  const { setAuth } = useAuth()

  const handleSesionClose = () => {
    setAuth({})
    localStorage.removeItem('token')
  }

  return (
    <div className='bg-primary shadow h-[70px] flex justify-between items-center p-5 '>
      <Link
        to='/home'
        className='text-3xl font-bold text-blue-500 md:flex hidden'
      >Facebook2

      </Link>
      <SearchComponent />
      <div className='hidden md:flex gap-5'>
        <button onClick={handleChangeMode}>
          {ModeNocturne ? <Sun color='white' /> : <Moon color='white' />}
        </button>
        <button>
          <Question color='white' />
        </button>
        <button
          onClick={handleSesionClose}
          className={`px-4 rounded py-2 font-bold flex gap-2 ${buttons}`}
        >Out
          <SessionOut color='white' />
        </button>
      </div>

    </div>
  )
}
