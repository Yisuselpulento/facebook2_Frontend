import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Moon, Sun, Question, Question2 } from '../assets/icons/iconos'
const ButtonTheme = () => {
  const { setColor, color } = useAuth()

  const [theme, setTheme] = useState(() => {
    // Primero, intenta obtener el tema del localStorage
    const localTheme = window.localStorage.getItem('theme')
    if (localTheme) {
      return localTheme
    }

    // Si no hay tema en localStorage, verifica las preferencias del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
    }
    // Guarda el tema actual en localStorage
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const handleChangeMode = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
    setColor((prevState) => (prevState === 'white' ? 'black' : 'white'))
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
