import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Moon, Sun, Question, Question2 } from '../assets/icons/iconos'
const ButtonTheme = () => {
  const { setColor, color } = useAuth()
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
    setColor(prevState => prevState === 'white' ? 'black' : 'white')
  }
  return (
    <div className='flex md:gap-3 gap-3'>
      <button
        onClick={handleChangeMode}
      >
        {theme === 'light' ? <Moon color='black' /> : <Sun color='white' />}
      </button>
      <button>
        {color === 'black' ? <Question2 /> : <Question color={color} />}
      </button>
    </div>
  )
}

export default ButtonTheme
