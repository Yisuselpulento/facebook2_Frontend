import { Link } from 'react-router-dom'
import { Sun, Moon, Question } from '../assets/icons/iconos'
import { useState, useEffect } from 'react'

export const Nav = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark')
    } else { document.querySelector('html').classList.remove('dark') }
  }, [theme])

  const handleChangeMode = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className='bg-white dark:bg-primary shadow h-[70px] flex justify-between items-center p-5 '>
      <Link
        to='/'
        className='text-3xl font-bold text-blue-500'
      >Facebook2

      </Link>
      <div className='flex gap-5'>
        <button onClick={handleChangeMode}>
          {theme === 'light' ? <Moon color='white' /> : <Sun color='white' />}
        </button>
        <button>
          <Question color='white' />
        </button>
      </div>

    </div>
  )
}
