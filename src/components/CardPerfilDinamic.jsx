import React from 'react'
import { LocationIcon } from '../assets/icons/iconos'

export const CardPerfilDinamic = ({ usuario }) => {
  return (

    <div className='bg-white dark:bg-primary p-4 shadow md:h-[400px] rounded md:w-[550px] md:flex flex-col gap-5 text-gray-700 dark:text-font1'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div>
            <img
              className='w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-700'
              src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${usuario.image}`}
            />
          </div>
          <div>
            <h2 className='text-lg  font-bold'>{usuario.nombre}</h2>

          </div>
        </div>
      </div>
      <div className=' flex gap-10 '>
        <div className='flex flex-col gap-3'>
          <p>Edad:</p>
          <p>Sexo:</p>
        </div>
        <div className='flex flex-col gap-3'>
          <p>{usuario.age}</p>
          <p>{usuario.sexo}</p>
        </div>
      </div>
      <div className=' flex gap-10'>
        <div className='flex gap-2'>
          <LocationIcon color='white' />
          <p>Pais:</p>
        </div>

        <p>{usuario.country}</p>
      </div>
    </div>

  )
}
