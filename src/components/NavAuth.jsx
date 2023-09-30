import { Link } from 'react-router-dom'
import { Sun, Moon, Question } from '../assets/icons/iconos'
import { useState } from 'react'

export const NavAuth = () => {
  const [ModeNocturne, setModeNocturne] = useState(true)

  const handleChangeMode = () => {
    setModeNocturne(!ModeNocturne)
  }

  return (
    <div className='bg-primary shadow h-[70px] flex justify-between items-center p-5 '>
      <Link
        to='/home'
        className='text-3xl font-bold text-blue-500'
      >Facebook2

      </Link>
      <div className='flex gap-5'>
        <button onClick={handleChangeMode}>
          {ModeNocturne ? <Sun color='white' /> : <Moon color='white' />}
        </button>
        <button>
          <Question color='white' />
        </button>
      </div>

    </div>
  )
}
