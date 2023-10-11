import { Link } from 'react-router-dom'
import ButtonTheme from './ButtonTheme'

export const Nav = () => {
  return (
    <div className='bg-white dark:bg-primary shadow h-[60px] flex justify-between items-center p-5 '>
      <Link
        to='/'
        className='text-3xl font-bold text-blue-500'
      >Facebook2

      </Link>
      <div className='flex gap-5'>
        <ButtonTheme />
      </div>

    </div>
  )
}
