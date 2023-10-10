import { Link } from 'react-router-dom'
import { Sun, Moon, Question, SessionOut } from '../assets/icons/iconos'
import { useState, useEffect } from 'react'
import SearchComponent from './SearchComponent'
import useAuth from '../hooks/useAuth'
import { buttons } from '../helpers/TailwindVar'

export const NavAuth = () => {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-shceme: dark)').matches) {
      return 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark')
    } else { document.querySelector('html').classList.remove('dark') }
  }, [theme])

  const handleChangeMode = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const { setAuth } = useAuth()

  const handleSesionClose = () => {
    setAuth({})
    localStorage.removeItem('token')
  }

  return (
    <div className='bg-white dark:bg-primary shadow h-[48px] flex justify-between items-center p-3 '>
      <Link
        to='/home'
        className='text-2xl font-bold text-blue-500 md:flex hidden'
      >Facebook2

      </Link>
      <SearchComponent />
      <div className='hidden md:flex gap-5'>
        <button onClick={handleChangeMode}>
          {theme === 'light' ? <Moon color='white' /> : <Sun color='white' />}
        </button>
        <button>
          <Question color='white' />
        </button>
        <button
          onClick={handleSesionClose}
          className={`text-center px-3 rounded py-1 font-bold flex gap-2 ${buttons} flex items-center`}
        >Out
          <SessionOut color='white' />
        </button>
      </div>

    </div>
  )
}
