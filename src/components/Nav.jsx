import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <div className='bg-primary shadow h-[70px] flex flex-col justify-center p-6'>
      <Link
        to='/'
        className='text-3xl font-bold text-blue-500'
      >Facebook2
      </Link>
    </div>
  )
}
