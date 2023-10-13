import React from 'react'
import { LocationIcon } from '../assets/icons/iconos'
import useAuth from '../hooks/useAuth'

export const CardPerfilDinamic = ({ usuario }) => {
  const { color } = useAuth()

  return (

    <div className='bg-white dark:bg-primary p-4 shadow w-full md:h-[350px] rounded md:w-[270px] md:flex flex-col gap-5 text-gray-700 dark:text-font1 '>
      <div>
        <div className='flex flex-col md:flex-row gap-3 items-center '>
          <div>
            <img
              className='w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-700'
              src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${usuario.image}`}
            />
          </div>
          <div>
            <h2 className='text-md  font-bold'>{usuario.nombre}</h2>

          </div>
        </div>
      </div>
      <div className=' flex gap-8 '>
        <div className='flex flex-col gap-2'>
          <p>Edad:</p>
          <p>Sexo:</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p>{usuario.age}</p>
          <p>{usuario.sexo}</p>
        </div>
      </div>
      <div className=' flex gap-10'>
        <div className='flex gap-2'>
          <LocationIcon color={color} />
          <p>Pais:</p>
        </div>

        <p>{usuario.country}</p>
      </div>
    </div>

  )
}
