import useAuth from '../hooks/useAuth'
import { Config } from '../assets/icons/iconos'

export const Aside = () => {
  const { auth } = useAuth()

  return (
    <aside className='bg-primary p-4  h-[400px] rounded w-[300px] md:flex hidden flex-col gap-5'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div className='bg-gray-300 rounded-full h-[60px] w-[60px]'>
            im
          </div>
          <h2 className='text-lg text-font1'>{auth.nombre}</h2>
        </div>
        <button className='bg-blue-700 py-1 px-3 rounded-full text-font1'>
          Ver Perfil
        </button>
      </div>
      <div>
        2
      </div>
      <div>
        3
      </div>
      <div>
        <button>
          <Config color='white' />
        </button>
      </div>
    </aside>
  )
}