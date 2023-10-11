import useAuth from '../hooks/useAuth'
import { Config, LocationIcon } from '../assets/icons/iconos'
import { Link } from 'react-router-dom'
import { buttons } from '../helpers/TailwindVar'

export const Aside = () => {
  const { auth, modalEdit, setModalEdit, color } = useAuth()

  return (
    <aside className='bg-white dark:bg-primary p-4 shadow h-[350px] rounded w-[270px] md:flex hidden flex-col gap-5 text-gray-700 dark:text-font1'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div>
            <img
              className='w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-700'
              src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${auth.image}`}
            />
          </div>
          <div className='flex flex-col gap-1 text-center'>
            <h2 className='text-md  font-bold'>{auth.nombre}</h2>
            <Link
              className={`${buttons} bg-blue-700 px-1 rounded-full text-font1 hover:bg-blue-800`}
              to='/perfil'
            >
              Ver Perfil
            </Link>

          </div>
        </div>
      </div>
      <div className=' flex gap-8 '>
        <div className='flex flex-col gap-2'>
          <p>Edad:</p>
          <p>Sexo:</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p>{auth.age}</p>
          <p>{auth.sexo}</p>
        </div>
      </div>
      <div className=' flex gap-8'>
        <div className='flex gap-2'>
          <LocationIcon color={color} />
          <p>Pais:</p>
        </div>

        <p>{auth.country}</p>
      </div>
      <div>
        <button
          className='bg-blue-700 px-3 py-1 rounded-lg hover:bg-blue-800'
          onClick={() => setModalEdit(!modalEdit)}
        >
          <Config color='white' />
        </button>
      </div>
    </aside>
  )
}
