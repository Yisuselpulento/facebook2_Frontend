import React from 'react'
import IMG from '../assets/img/robot.webp'

export const NotFound = () => {
  return (
    <div className='text-gray-700 flex flex-col items-center justify-center gap-2'>
      <div className='flex flex-col gap-2'>
        <img src={IMG} width={400} />
        <p className='text-xl font-bold'>Lo siento esta pagina aun no esta creada</p>
      </div>
      <h1 className='text-5xl font-bold'>404</h1>
    </div>
  )
}
